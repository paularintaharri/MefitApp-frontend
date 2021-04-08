const url = 'https://me-fit-app.herokuapp.com/api/v1/profiles/';

export async function getProfileData(token, tokenParsed) {

    let id;

    if (tokenParsed) {
        id = tokenParsed.sub;
        try {
            let response = await fetch(url + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let responseJson = await response.json();
            return (responseJson);
        } catch (error) {
            console.log("error is: " + error);
        }
    }
}

export async function patchProfileData(params, token, tokenParsed) {

    const id = tokenParsed.sub;

    try {
        let response = await fetch(url + id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "weight": parseInt(params.weight),
                "height": parseInt(params.height),
                "medical_conditions": params.medical_conditions,
                "disabilities": params.disabilities,
                "image_link": params.image_link
            })
        });
        let responseJson = await response.json();
        return responseJson.result;
    } catch (error) {
        console.log("error is: " + error);
    }
}

export async function postProfileData(params, token, tokenParsed) {

    const id = tokenParsed.sub;

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": id,
                "weight": parseInt(params.weight),
                "height": parseInt(params.height),
                "medical_conditions": params.medical_conditions,
                "disabilities": params.disabilities,
                "image_link": params.image_link
            })
        });
        let responseJson = await response.json();
        return responseJson.result;
    } catch (error) {
        console.log("error is: " + error);
    }
}
