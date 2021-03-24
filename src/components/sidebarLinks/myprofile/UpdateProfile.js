import React, { useState } from 'react';

const UpdateProfile = (props) => {
  const [userInfo, setuserInfo] = useState({
    name: props.name || '',
    age: props.age || '',
    city: props.city || '',
    job: props.job || '',
    company: props.company || '',
    website: props.website || ''
  })
  // Destructure props and state
  const { name, age, city, job, company, website } = userInfo;
  const { getUserInfo, id, showUpdate } = props;

  const onChange = (e) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.updateUserInfo(userInfo);
    console.log(userInfo);
    getUserInfo(id)
    showUpdate()
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
          <button type="button" onClick={props.showUpdate}>Cancel</button>
          <button className="btn-green" type="submit">Update</button>
        </div>
      </form>
    </div>
  ) : (<div style={style}>
    <h2>Name: {name}</h2>
    <h2>Age: {age}</h2>
    <h2>City: {city}</h2>
    <h2>Job: {job}</h2>
    <h2>Company: {company}</h2>
    <h2>Website: {website}</h2>

  </div>)
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