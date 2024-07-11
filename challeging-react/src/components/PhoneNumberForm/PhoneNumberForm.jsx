import styles from "./PhoneNumberForm.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PhoneNumbeForm = () => {
    const navigate = useNavigate();
    
    const sendAccessCode = (e) => {
        const phoneNumber = document.getElementById('phone-number').value;
        if(phoneNumber != ''){
            axios.post('http://localhost:4000/create-new-access-code', {
                phoneNumber: phoneNumber
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        const phoneNumber = document.getElementById('phone-number').value;
        const accessCode = document.getElementById('access-code').value;

        axios.post('http://localhost:4000/validate-access-code', {
            phoneNumber: phoneNumber,
            accessCode: accessCode
        })
        .then(response => {
            const successObject = response.data;
            console.log(successObject)
            if(successObject.success == false){
                localStorage.setItem('phoneNumber', '');
                alert('Confirmation is failed');
            }else {
                alert('Confirmation is successfull');
                localStorage.setItem('phoneNumber', phoneNumber);
                navigate('/github-users');
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return ( 
        <section className={styles.phoneNumberSection}>
            <form id="phone-number-form" onSubmit={onSubmitForm}>
                <div className={styles.phoneNumberDiv}>
                    <input id="phone-number" type="text" name="phoneNumber" required placeholder="Enter your phone number ..." />
                    <button type="button" onClick={sendAccessCode}>Send access code</button>
                </div>
                <input id="access-code" type="text" name="accessCode" required placeholder="Enter your access code ..." />
                <button type="submit">Confirm</button>
            </form>
        </section>
    );
}
 
export default PhoneNumbeForm;