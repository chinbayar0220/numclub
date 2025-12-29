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
