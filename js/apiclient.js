export const getClubs = async () => {
    try {
        const result = await fetch("http://127.0.0.1:3000/api/clubs");
        if (!result.ok) {
            return { code: 500, data: [] };
        }
        const data = await result.json();
        return{code:200, data:data};
        
    } catch (error) {
        return { code: 500, data: [] };
    }
}

// export const updateClub = (club) => {
//     const result = await fetch("/api/clubs", { method:});

// }

export const getFilters = async () =>{
    try{
        const result = await fetch("http://127.0.0.1:3000/api/filters");
        if(!result.ok) return { code:500, data: []};
        const data = await result.json();
        return{code:200, data};
    } catch (error){
        return{
            code:500, data: []
        };
    }
};

const postJson = async (url, payload) => {
    try {
        const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload || {})
        });
        if (!result.ok) {
            return { code: result.status, data: null };
        }
        const data = await result.json();
        return { code: 200, data };
    } catch (error) {
        return { code: 500, data: null };
    }
};

export const loginUser = async ({ email, password }) => {
    return postJson("http://127.0.0.1:3000/api/login", { email, password });
};

export const signupUser = async ({ email, password, name }) => {
    return postJson("http://127.0.0.1:3000/api/signup", { email, password, name });
};

export const getUserProfile = async (email) => {
    if (!email) {
        return { code: 400, data: null };
    }
    try {
        const url = `http://127.0.0.1:3000/api/profile?email=${encodeURIComponent(email)}`;
        const result = await fetch(url);
        const data = await result.json().catch(() => null);
        return { code: result.status, data };
    } catch (error) {
        return { code: 500, data: null };
    }
};

export const saveUserProfile = async (payload) => {
    return postJson("http://127.0.0.1:3000/api/profile", payload);
};

export const submitClubRequest = async (payload) => {
    return postJson("http://127.0.0.1:3000/api/club-requests", payload);
};

export const getClubRequests = async ({ clubId, email, status } = {}) => {
    try {
        const params = new URLSearchParams();
        if (clubId) params.set("clubId", clubId);
        if (email) params.set("email", email);
        if (status) params.set("status", status);
        const query = params.toString();
        const url = `http://127.0.0.1:3000/api/club-requests${query ? `?${query}` : ""}`;
        const result = await fetch(url);
        if (!result.ok) {
            return { code: result.status, data: { requests: [] } };
        }
        const data = await result.json();
        return { code: 200, data };
    } catch (error) {
        return { code: 500, data: { requests: [] } };
    }
};

export const decideClubRequest = async (requestId, { status, decidedBy } = {}) => {
    return postJson(`http://127.0.0.1:3000/api/club-requests/${requestId}/decision`, {
        status,
        decidedBy
    });
};

export const getReviews = async (clubId) => {
    try {
        const params = new URLSearchParams();
        if (clubId) params.set("clubId", clubId);
        const query = params.toString();
        const url = `http://127.0.0.1:3000/api/reviews${query ? `?${query}` : ""}`;
        const result = await fetch(url);
        if (!result.ok) {
            return { code: result.status, data: { reviews: [] } };
        }
        const data = await result.json();
        return { code: 200, data };
    } catch (error) {
        return { code: 500, data: { reviews: [] } };
    }
};

export const submitReview = async (payload) => {
    return postJson("http://127.0.0.1:3000/api/reviews", payload);
};
