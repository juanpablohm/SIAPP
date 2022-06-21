import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'https://siapucaldas.herokuapp.com/api/Internship/';

export async function getInternships() {

    try{
        let url = new URL( baseEndpoint);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let internship = await response.json(); 

        return internship;

    }catch(err){
       throw err;
    }
};


export async function getInternshipById(internshipId) {

    if (internshipId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL( baseEndpoint  + "GetInternshipById/");
        url.searchParams.set('id', internshipId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let internship = await response.json(); 

        return internship;

    }catch(err){
       throw err;
    }
};

export async function createInternship(newInternship) {

    if (newInternship == null) throw new RequiredArgumentError('internship');

    try{
        let url = new URL(baseEndpoint );

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newInternship)
        })

        let internship = await response.json(); 

        return internship;

    }catch(err){
       throw err;
    }
};

export async function updateInternship(newInternship) {

    if (newInternship == null) throw new RequiredArgumentError('internship');

    try{
        let url = new URL(baseEndpoint);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newInternship)
        })

        let internship = await response.json(); 

        console.log(internship);

        return internship;

    }catch(err){
       throw err;
    }
};

export async function createControlVisit(newControl) {

    if (newControl == null) throw new RequiredArgumentError('internship');

    try{
        let url = new URL("https://siapucaldas.herokuapp.com/api/ControlVisit");

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newControl)
        })

        return response;

    }catch(err){
       throw err;
    }
};


export async function deleteInternshipById(internshipId) {

    if (internshipId == null) throw new RequiredArgumentError('id');

    try{
    
        let url = new URL( baseEndpoint + internshipId );

        let response = await fetch(url, {
            'method': "DELETE",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let internship = await response.json(); 

        return internship;

    }catch(err){
       throw err;
    }
};


export async function updateInternshipStatus(internshipId, newStatus) {

    if (internshipId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL( baseEndpoint  + "UpdateInternshipStatus");
        url.searchParams.set('internshipId', internshipId);
        url.searchParams.set('internshipstatus', newStatus);

        console.log(url.toString());

        let response = await fetch(url, {
            'method': "PUT",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let internship;

        return internship;

    }catch(err){
       throw err;
    }
};


