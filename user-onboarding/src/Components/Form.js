import React from 'react'

export default function Form(props){
    const {change, submit, errors} = props;
    const {username, email, password, checked} = props.values;

    const onChange = (evt) => {
        const {name, value, checked, type} = evt.target;
        const newVal = type === 'checkbox' ? checked: value;
        change(name, newVal);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }




    return(
        <div>
            <h1>User Form</h1>
            <p style={{'color': 'red'}}>{errors.username}</p>
            <p style={{'color': 'red'}}>{errors.email}</p>
            <p style={{'color': 'red'}}>{errors.password}</p>
            <p style={{'color': 'red'}}>{errors.tos}</p>
            <form onSubmit={onSubmit}>
                <label>Name:
                    <input 
                        type='text'
                        name='username'
                        value={username}
                        onChange={onChange}
                    />
                </label>

                <label>Email:
                    <input 
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                    />
                </label>
                
                <label>Password:
                    <input 
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                    />
                </label>

                <label>Terms of service:
                    <input 
                        type='checkbox'
                        name='tos'
                        checked={checked}
                        onChange={onChange}
                    />
                </label>
                <input type='submit' value='Create'/>
            </form>
        </div>
    )
}