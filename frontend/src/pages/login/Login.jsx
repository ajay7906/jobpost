
import { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/auth';
import { showToast } from '../../components/showtoast/showToast';

function Login() {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate()
    const onChangeValue = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }
    //submit function
    console.log(formData);
    const onSubmitData = async ()=>{
        const responce = await loginUser(formData)
       
        if (responce.success) {
            showToast('login successful', { type: 'success' });
            navigate('/')
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h2>Already have an account?</h2>
                    <p>Your personal job finder is here</p>

                    <input type="text" placeholder='email' name='email' onChange={onChangeValue}/>
                    <input type="text" placeholder='password' name='password' onChange={onChangeValue}/>


                  
                    <button onClick={onSubmitData}>Sign In</button>
                    <p>Don’t have an account? <Link to='/register'>Sign Up</Link></p>
                </div>
            </div>
            <div className={styles.right}>
                <h2>Your Personal Job Finder</h2>
            </div>
        </div>
    )
}

export default Login