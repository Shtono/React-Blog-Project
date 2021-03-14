import React, { useState } from 'react';

const UpdateProfile = (props) => {

  const [userInfo, setuserInfo] = useState({
    name: props.name ? props.name : '',
    age: props.age ? props.age : '',
    city: props.city ? props.city : '',
    job: props.job ? props.job : '',
    company: props.company ? props.company : '',
    website: props.website ? props.website : ''
  })
  const { name, age, city, job, company, website } = userInfo;

  const onChange = (e) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.updateUserInfo(userInfo);
    console.log(userInfo);
    // setuserInfo({ name: '', age: '', city: '', job: '', company: '', website: '' })
  }

  return props.showInfo ? (
    <div className="update-profile" style={{ width: '100%' }}>
      <form style={style} onSubmit={onSubmit}>
        <input style={styleInput} type="text" placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input style={styleInput} type="text" placeholder="Age"
          name="age"
          value={age}
          onChange={onChange}
        />
        <input style={styleInput} type="text" placeholder="City"
          name="city"
          value={city}
          onChange={onChange} />
        <input style={styleInput} type="text" placeholder="Job"
          name="job"
          value={job}
          onChange={onChange}
        />
        <input style={styleInput} type="text" placeholder="Company"
          name="company"
          value={company}
          onChange={onChange}
        />
        <input style={styleInput} type="text" placeholder="Website"
          name="website"
          value={website}
          onChange={onChange}
        />
        <div>
          <button onClick={props.update}>Cancel</button>
          <button className="btn-green" type="submit">Update</button>
        </div>
      </form>
    </div>
  ) : (<div></div>)
}

const style = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '25px',
  gap: '15px',

}
const styleInput = {
  width: '100%',
  fontSize: '20px',
}

export default UpdateProfile;