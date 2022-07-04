const fetch = require('node-fetch') 

async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data
}

async function postData(url, form, header){

    let options

    options = {
        method: "POST",
        body: form,
        headers: header
    }

    const response = await fetch(url,options)
    return await response.json()

}

async function patchData(url, form, header){

    let options

    options = {
        method: "PATCH",
        body: form,
        headers: header
    }

    const response = await fetch(url,options)

    return await response.json()


}


async function deleteData(url, form, header){

    let options

    options = {
        method: "DELETE",
        body: form,
        headers: header
    }

    const response = await fetch(url,options)

    return await response.json()

}

const func = { 
    getData,
    postData,
    patchData,
    deleteData
}

export default func