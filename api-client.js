const url = "https://localhost:3000";

const getData = async () => {
    const res = await fetch(url);
    const data =await res.json();
    return data;
}

const postData = async (task) => {
    const answer = await fetch(url, {
        method:"POST",
        body: JSON.stringify({
            "description":task.description,
            "done": false }), 
        headers: {
            "Content-Type": "application/json",
        }
    })
    return answer;
}

const putData = async (task) => {
    await fetch(`${url}/${task._id}`, { 
        method:"PUT",
        body: JSON.stringify({
            "description":task.description,
            "done":task.done}), 
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteData = async (task) => {
    await fetch(`${url}/${task._id}`, {
        method: "DELETE"
    })
}

export {getData, postData, putData, deleteData};