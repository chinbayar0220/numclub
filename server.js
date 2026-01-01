// server.js
import { createServer } from "node:http";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, { ...corsHeaders, "content-type": "application/json" });
  res.end(JSON.stringify(payload));
};

const readJson = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) {
    return null;
  }
  const text = Buffer.concat(chunks).toString("utf8");
  try {
    return JSON.parse(text);
  } catch (error) {
    const err = new Error("Invalid JSON");
    err.statusCode = 400;
    throw err;
  }
};

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const upsertUser = async (email, password, name, updateName = false) => {
  if (!email) return null;
  const fallbackName = email.split("@")[0] || email;
  const finalName = name || fallbackName;
  const { rows } = await pool.query(
    `insert into users (name, email, password)
     values ($1, $2, $3)
     on conflict (email) do update set
       name = case when $4 then excluded.name else users.name end,
       password = coalesce(excluded.password, users.password)
     returning id, name, email, role`,
    [finalName, email, password || null, updateName]
  );
  return rows[0];
};

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  const url = new URL(req.url, "http://127.0.0.1");
  const { pathname, searchParams } = url;
  const segments = pathname.split("/").filter(Boolean);

  try {
    if (req.method === "GET" && pathname === "/api/filters") {
      const [directionsResult, schoolsResult] = await Promise.all([
        pool.query("select id, label from directions order by label"),
        pool.query("select id, label from schools order by label"),
      ]);

      sendJson(res, 200, {
        filters: {
          directions: directionsResult.rows,
          schools: schoolsResult.rows,
        },
      });
      return;
    }

    if (req.method === "GET" && pathname === "/api/clubs") {
      const { rows } = await pool.query(`
        select
          c.id,
          c.name,
          c.name as cname,
          c.short_name as "shortName",
          c.description,
          c.goal,
          c.vision,
          c.school,
          c.logo,
          c.email,
          c.phone,
          c.members,
          coalesce(
            array_agg(cd.direction_id) filter (where cd.direction_id is not null),
            '{}'::text[]
          ) as directions
        from clubs c
        left join club_directions cd on c.id = cd.club_id
        group by c.id
        order by c.id
      `);

      sendJson(res, 200, { clubs: rows });
      return;
    }

    if (req.method === "GET" && segments[0] === "api" && segments[1] === "clubs" && segments.length === 3) {
      const clubId = parseId(segments[2]);
      if (!clubId) {
        sendJson(res, 400, { message: "Invalid club id" });
        return;
      }

      const clubResult = await pool.query(
        `select
           c.id,
           c.name,
           c.name as cname,
           c.short_name as "shortName",
           c.description,
           c.goal,
           c.vision,
           c.school,
           c.logo,
           c.email,
           c.phone,
           c.members,
           coalesce(
             array_agg(cd.direction_id) filter (where cd.direction_id is not null),
             '{}'::text[]
           ) as directions
         from clubs c
         left join club_directions cd on c.id = cd.club_id
         where c.id = $1
         group by c.id`,
        [clubId]
      );

      if (clubResult.rows.length === 0) {
        sendJson(res, 404, { message: "Club not found" });
        return;
      }

      const eventsResult = await pool.query(
        `select id, club_id, title, description, location, starts_at as "startsAt",
                ends_at as "endsAt", capacity, created_at as "createdAt"
         from events
         where club_id = $1
         order by starts_at nulls last, id`,
        [clubId]
      );

      const reviewsResult = await pool.query(
        `select r.id, r.club_id, r.rating, r.title, r.body, r.created_at as "createdAt",
                u.name as "userName", u.email as "userEmail"
         from club_reviews r
         left join users u on r.user_id = u.id
         where r.club_id = $1
         order by r.created_at desc`,
        [clubId]
      );

      sendJson(res, 200, {
        club: clubResult.rows[0],
        events: eventsResult.rows,
        reviews: reviewsResult.rows,
      });
      return;
    }

    if (req.method === "POST" && pathname === "/api/signup") {
      const body = (await readJson(req)) || {};
      const { email, password, name } = body;
      if (!email) {
        sendJson(res, 400, { message: "Email is required" });
        return;
      }
      const user = await upsertUser(email, password, name, true);
      sendJson(res, 200, { user });
      return;
    }

    if (req.method === "POST" && pathname === "/api/login") {
      const body = (await readJson(req)) || {};
      const { email, password } = body;
      if (!email) {
        sendJson(res, 400, { message: "Email is required" });
        return;
      }
      const user = await upsertUser(email, password, null, false);
      sendJson(res, 200, { user });
      return;
    }

    if (req.method === "GET" && pathname === "/api/profile") {
      const email = searchParams.get("email");
      if (!email) {
        sendJson(res, 400, { message: "Email is required" });
        return;
      }

      const { rows } = await pool.query(
        `select id, name, email, school, major, year, phone, bio,
                avatar_url as "avatarUrl"
         from users
         where email = $1`,
        [email]
      );

      if (rows.length === 0) {
        sendJson(res, 404, { message: "Profile not found" });
        return;
      }

      sendJson(res, 200, { profile: rows[0] });
      return;
    }

    if (req.method === "POST" && pathname === "/api/profile") {
      const body = (await readJson(req)) || {};
      const email = body.email;
      if (!email) {
        sendJson(res, 400, { message: "Email is required" });
        return;
      }

      const name = typeof body.name === "string" ? body.name.trim() : "";
      const school = typeof body.school === "string" ? body.school.trim() : "";
      const major = typeof body.major === "string" ? body.major.trim() : "";
      const year = typeof body.year === "string" ? body.year.trim() : "";
      const phone = typeof body.phone === "string" ? body.phone.trim() : "";
      const bio = typeof body.bio === "string" ? body.bio.trim() : "";
      const avatarUrl = typeof body.avatarUrl === "string" ? body.avatarUrl.trim() : "";
      const fallbackName = email.split("@")[0] || email;
      const finalName = name || fallbackName;

      const { rows } = await pool.query(
        `insert into users (name, email, school, major, year, phone, bio, avatar_url)
         values ($1, $2, $3, $4, $5, $6, $7, $8)
         on conflict (email) do update set
           name = excluded.name,
           school = excluded.school,
           major = excluded.major,
           year = excluded.year,
           phone = excluded.phone,
           bio = excluded.bio,
           avatar_url = excluded.avatar_url
         returning id, name, email, school, major, year, phone, bio,
                   avatar_url as "avatarUrl"`,
        [
          finalName,
          email,
          school || null,
          major || null,
          year || null,
          phone || null,
          bio || null,
          avatarUrl || null,
        ]
      );

      sendJson(res, 200, { profile: rows[0] });
      return;
    }

    if (req.method === "GET" && pathname === "/api/club-requests") {
      const clubId = parseId(searchParams.get("clubId"));
      const email = searchParams.get("email") || null;
      const status = searchParams.get("status") || null;

      const { rows } = await pool.query(
        `select r.id, r.club_id, r.email, r.phone, r.reason, r.impact, r.description,
                r.status, r.created_at as "createdAt", r.decided_at as "decidedAt",
                r.decided_by as "decidedBy",
                c.name as "clubName", c.logo as "clubLogo"
         from club_requests r
         join clubs c on c.id = r.club_id
         where ($1::bigint is null or r.club_id = $1)
           and ($2::text is null or r.email = $2)
           and ($3::text is null or r.status = $3)
         order by r.created_at desc`,
        [clubId, email, status]
      );

      sendJson(res, 200, { requests: rows });
      return;
    }

    if (req.method === "POST" && pathname === "/api/club-requests") {
      const body = (await readJson(req)) || {};
      const clubId = parseId(body.clubId);
      const { email, phone, reason, impact, description } = body;
      if (!clubId || !email) {
        sendJson(res, 400, { message: "clubId and email are required" });
        return;
      }

      const result = await pool.query(
        `insert into club_requests (club_id, email, phone, reason, impact, description)
         values ($1, $2, $3, $4, $5, $6)
         returning id`,
        [clubId, email, phone || null, reason || null, impact || null, description || null]
      );

      sendJson(res, 201, { id: result.rows[0].id });
      return;
    }

    if (
      req.method === "POST" &&
      segments[0] === "api" &&
      segments[1] === "club-requests" &&
      segments.length === 4 &&
      segments[3] === "decision"
    ) {
      const requestId = parseId(segments[2]);
      if (!requestId) {
        sendJson(res, 400, { message: "Invalid request id" });
        return;
      }

      const body = (await readJson(req)) || {};
      const status = typeof body.status === "string" ? body.status.toLowerCase() : "";
      const decidedBy = body.decidedBy || null;
      if (!["approved", "rejected", "pending"].includes(status)) {
        sendJson(res, 400, { message: "Invalid status" });
        return;
      }

      const result = await pool.query(
        `update club_requests
         set status = $1,
             decided_at = case when $1 = 'pending' then null else now() end,
             decided_by = $2
         where id = $3
         returning id, club_id, email, status, decided_at as "decidedAt", decided_by as "decidedBy"`,
        [status, decidedBy, requestId]
      );

      if (result.rows.length === 0) {
        sendJson(res, 404, { message: "Request not found" });
        return;
      }

      sendJson(res, 200, { request: result.rows[0] });
      return;
    }

    if (req.method === "GET" && pathname === "/api/events") {
      const clubId = parseId(searchParams.get("clubId"));
      const { rows } = await pool.query(
        `select id, club_id, title, description, location, starts_at as "startsAt",
                ends_at as "endsAt", capacity, created_at as "createdAt"
         from events
         where ($1::bigint is null or club_id = $1)
         order by starts_at nulls last, id`,
        [clubId]
      );
      sendJson(res, 200, { events: rows });
      return;
    }

    if (req.method === "POST" && pathname === "/api/events") {
      const body = (await readJson(req)) || {};
      const clubId = parseId(body.clubId);
      const {
        title,
        description,
        location,
        startsAt,
        endsAt,
        capacity,
        createdByEmail,
      } = body;

      if (!clubId || !title) {
        sendJson(res, 400, { message: "clubId and title are required" });
        return;
      }

      let createdBy = null;
      if (createdByEmail) {
        const user = await upsertUser(createdByEmail, null, null, false);
        createdBy = user ? user.id : null;
      }

      const result = await pool.query(
        `insert into events (club_id, title, description, location, starts_at, ends_at, capacity, created_by)
         values ($1, $2, $3, $4, $5, $6, $7, $8)
         returning id`,
        [
          clubId,
          title,
          description || null,
          location || null,
          startsAt || null,
          endsAt || null,
          capacity || null,
          createdBy,
        ]
      );

      sendJson(res, 201, { id: result.rows[0].id });
      return;
    }

    if (req.method === "POST" && pathname === "/api/event-registrations") {
      const body = (await readJson(req)) || {};
      const eventId = parseId(body.eventId);
      const { email } = body;
      if (!eventId || !email) {
        sendJson(res, 400, { message: "eventId and email are required" });
        return;
      }

      const user = await upsertUser(email, null, null, false);
      if (!user) {
        sendJson(res, 400, { message: "User create failed" });
        return;
      }

      await pool.query(
        `insert into event_registrations (event_id, user_id)
         values ($1, $2)
         on conflict (event_id, user_id) do nothing`,
        [eventId, user.id]
      );

      sendJson(res, 201, { ok: true });
      return;
    }

    if (req.method === "GET" && pathname === "/api/reviews") {
      const clubId = parseId(searchParams.get("clubId"));
      const { rows } = await pool.query(
        `select r.id, r.club_id, r.rating, r.title, r.body, r.created_at as "createdAt",
                u.name as "userName", u.email as "userEmail"
         from club_reviews r
         left join users u on r.user_id = u.id
         where ($1::bigint is null or r.club_id = $1)
         order by r.created_at desc`,
        [clubId]
      );
      sendJson(res, 200, { reviews: rows });
      return;
    }

    if (req.method === "POST" && pathname === "/api/reviews") {
      const body = (await readJson(req)) || {};
      const clubId = parseId(body.clubId);
      const { rating, title, body: reviewBody, email } = body;
      if (!clubId || !rating) {
        sendJson(res, 400, { message: "clubId and rating are required" });
        return;
      }

      let userId = null;
      if (email) {
        const user = await upsertUser(email, null, null, false);
        userId = user ? user.id : null;
      }

      const result = await pool.query(
        `insert into club_reviews (club_id, user_id, rating, title, body)
         values ($1, $2, $3, $4, $5)
         returning id`,
        [clubId, userId, rating, title || null, reviewBody || null]
      );

      sendJson(res, 201, { id: result.rows[0].id });
      return;
    }

    sendJson(res, 404, { message: "Not found" });
  } catch (error) {
    console.error("Server error:", error);
    const status = error.statusCode || 500;
    sendJson(res, status, { message: error.message || "Server error" });
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
