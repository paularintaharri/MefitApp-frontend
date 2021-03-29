import axios from 'axios'

const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/exercises';
const apiUrlGetExercise = 'https://me-fit-app.herokuapp.com';
const token = 'eyJ0b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSWdPaUFpU2xkVUlpd2lhMmxrSWlBNklDSklRakJIYVhCaFduWlViSE4wVTFWbE1GOTVSSHBNUVRZeUxUWkJObXRYWVVSWldrbDRSMGRaWjFGTkluMC5leUpsZUhBaU9qRTJNVFk0TXpVeE56Y3NJbWxoZENJNk1UWXhOamd6TkRnM055d2lZWFYwYUY5MGFXMWxJam94TmpFMk9ETTBOell6TENKcWRHa2lPaUkwWkRVNFkyTXhaUzFrT0RVd0xUUXhOamd0WWpNNU5pMWtZemd4WmpRNU5HUmtOV1FpTENKcGMzTWlPaUpvZEhSd2N6b3ZMMjFsTFdacGRDMWhjSEF0YTJWNVkyeHZZV3N1YUdWeWIydDFZWEJ3TG1OdmJTOWhkWFJvTDNKbFlXeHRjeTl0WldacGRHRndjQ0lzSW1GMVpDSTZJbUZqWTI5MWJuUWlMQ0p6ZFdJaU9pSTRNMlEwWVRCall5MWhaRFF3TFRRMk4ySXRPV0poTnkxaE16SmlabU5tTXpZME0ySWlMQ0owZVhBaU9pSkNaV0Z5WlhJaUxDSmhlbkFpT2lKdGVXTnNhV1Z1ZENJc0ltNXZibU5sSWpvaU9EbGxZVE5oTXpBdE9UUTNNQzAwWm1JMkxUaG1aR1V0WXpVMFpETTRNR0UyWmpFMklpd2ljMlZ6YzJsdmJsOXpkR0YwWlNJNkltUmxaRE5tTW1VM0xUUTJNMk10TkRVNVl5MWlPVFZoTFdKak4yWTFNR0ptTTJKbE1pSXNJbUZqY2lJNklqQWlMQ0poYkd4dmQyVmtMVzl5YVdkcGJuTWlPbHNpS2lKZExDSnlaWE52ZFhKalpWOWhZMk5sYzNNaU9uc2lZV05qYjNWdWRDSTZleUp5YjJ4bGN5STZXeUp0WVc1aFoyVXRZV05qYjNWdWRDSXNJbTFoYm1GblpTMWhZMk52ZFc1MExXeHBibXR6SWl3aWRtbGxkeTF3Y205bWFXeGxJbDE5ZlN3aWMyTnZjR1VpT2lKdmNHVnVhV1FnY205c1pYTWdjSEp2Wm1sc1pTQmxiV0ZwYkNJc0ltVnRZV2xzWDNabGNtbG1hV1ZrSWpwbVlXeHpaU3dpY205c1pYTWlPbHNpVlhObGNpSXNJbTltWm14cGJtVmZZV05qWlhOeklpd2lkVzFoWDJGMWRHaHZjbWw2WVhScGIyNGlYU3dpYm1GdFpTSTZJbkJoZFd4aElIUmxjM1JwSWl3aWNISmxabVZ5Y21Wa1gzVnpaWEp1WVcxbElqb2ljR0YxYkdGMFpYTjBhU0lzSW1kcGRtVnVYMjVoYldVaU9pSndZWFZzWVNJc0ltWmhiV2xzZVY5dVlXMWxJam9pZEdWemRHa2lMQ0psYldGcGJDSTZJbkJoZFd4aFFIUmxjM1JwTG1acEluMC5JZ3Z2Wm00c0l4V0xRdEtYMHY1Y0Z6LUJ0U3Vsa1IyUDFGQko0eWE0VnpXUTRlSkhoSTl4aGpTZVN1QnA4WmQ4TWZFWlhPcGhrb1VkekRTU1RXYkEwOGMteUYzQXQ1V0ZZcFozNHhtRXJscW5oY05WX1dndTl1LVFnSm5YV25BT2E5SnYxUXZNSEFJd2VObDhVbWx1ZlVOakx3MDduQmZyd0F6WVg3QkE0bS1Lc2ZEV1d4eWxrXzlWLUtsdE9ZNW5XNDQzYlpkTld4eDV6dnhHc3VTTVl0dXp2N0pJMGRSTDNLSzMxOFkya1hOd0lyc2NkNGJzUDVJamc2QjMwLUJpczhtVnBob2J2LTg2N2t4eXlMdzhSX29zSEpmemxJaFBYWl9JQzhnVUlzM0VIZ0tBQU1zX2dDYkxjaEY5Q1pLdDBIQkhmWTF0cjk0dm5FWjBDQmRGeUEiLCJ0b2tlblBhcnNlZCI6eyJleHAiOjE2MTY4MzUxNzcsImlhdCI6MTYxNjgzNDg3NywiYXV0aF90aW1lIjoxNjE2ODM0NzYzLCJqdGkiOiI0ZDU4Y2MxZS1kODUwLTQxNjgtYjM5Ni1kYzgxZjQ5NGRkNWQiLCJpc3MiOiJodHRwczovL21lLWZpdC1hcHAta2V5Y2xvYWsuaGVyb2t1YXBwLmNvbS9hdXRoL3JlYWxtcy9tZWZpdGFwcCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI4M2Q0YTBjYy1hZDQwLTQ2N2ItOWJhNy1hMzJiZmNmMzY0M2IiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJteWNsaWVudCIsIm5vbmNlIjoiODllYTNhMzAtOTQ3MC00ZmI2LThmZGUtYzU0ZDM4MGE2ZjE2Iiwic2Vzc2lvbl9zdGF0ZSI6ImRlZDNmMmU3LTQ2M2MtNDU5Yy1iOTVhLWJjN2Y1MGJmM2JlMiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcm9sZXMgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsiVXNlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXSwibmFtZSI6InBhdWxhIHRlc3RpIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicGF1bGF0ZXN0aSIsImdpdmVuX25hbWUiOiJwYXVsYSIsImZhbWlseV9uYW1lIjoidGVzdGkiLCJlbWFpbCI6InBhdWxhQHRlc3RpLmZpIn19'
let config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  }

export const getAllExercises = async () => {
    return await axios.get(apiUrl, config)
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const getExerciseById = async (id) => {
    return await axios.get(apiUrlGetExercise + id)
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const createExercises = async (form) => {
    return await axios.post(apiUrl, form)
        .then((results) => {
            if (results.status === 201) {
                console.log("Exercise has been succesfully created")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

export const updateExercises = async (form) => {
    return await axios.patch(apiUrl + "/" + form.id, form)
        .then((results) => {
            if (results.status === 204) {
                console.log("Exercise has been succesfully updated")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}
