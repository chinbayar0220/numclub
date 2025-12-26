export const getClubs = async (params = {}) => {
    try {
        // Build query string from params
        const queryParams = new URLSearchParams();
        
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.search) queryParams.append('search', params.search);
        if (params.direction) queryParams.append('direction', params.direction);
        if (params.school) queryParams.append('school', params.school);
        
        const queryString = queryParams.toString();
        const url = `http://127.0.0.1:3000/api/clubs${queryString ? '?' + queryString : ''}`;
        
        const result = await fetch(url);
        if (!result.ok) {
            return { code: 500, data: [], total: 0, page: 1, totalPages: 0 };
        }
        const data = await result.json();
        return { 
            code: 200, 
            data: data.clubs || data.data || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.totalPages || 1
        };
        
    } catch (error) {
        console.error('Get clubs error:', error);
        return { code: 500, data: [], total: 0, page: 1, totalPages: 0 };
    }
}

// export const updateClub = (club) => {
//     const result = await fetch("/api/clubs", { method:});

// }