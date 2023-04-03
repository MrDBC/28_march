import React, { useEffect, useState } from 'react'
import './RightContainer.css'
import { formToJSON } from 'axios';

function RightContainer() {
  const [subscription, setSubscription]=  useState('Try it free 7 days then ₹180/mo. thereafter')
  const [form, setForm] = useState({
    name: '',
    mail: '',
    password: '',
    skills: []
  });
  const [btnActive, setBtnActive] = useState(false);
  

  const formInputChange=(e)=>{
    setForm({...form, [e.target.name]: e.target.value})
    // console.log(form)
  }
  const handleSkillsChange=(e)=>{
    const selectedSkill = e.target.value;
    e.target.value = "";
    e.target.setCustomValidity("");
    
    if( selectedSkill && !form.skills.includes(selectedSkill))
      setForm((prevform)=> {
        return {...prevform, skills: [...prevform.skills, selectedSkill]}
      })

    // console.log(form.skills)
  }

  const handleRemoveSkill=(skillToRemove)=>{
    setForm((prevform)=>{
      return {...prevform, skills: prevform.skills.filter((skill)=> skill !== skillToRemove)}
    })
  }
  const getTrial=(e)=>{
    // console.log(form);
    e.preventDefault();
    if( !isFormFilled())
      return;
    setSubscription("You have successfully subscribed to our plan");
    setForm({name: '', mail: '', password:'', skills: []})
    setBtnActive(false)
  }

  const isFormFilled=(e)=>{
    // console.log(form);
    if( form.name.trim() && form.mail.trim() && form.password.trim()){

      if( form.skills.length){
        return true
      }else{
        if( e!= undefined && e.type== 'click'){
          // console.log('fill the form first')
          document.getElementsByClassName('skills-options')[0].setCustomValidity('plz fill the skills ')
          document.getElementsByClassName('skills-options')[0].reportValidity()
        }
        return false
      }
    }
  }

  useEffect(()=>{
    setBtnActive(isFormFilled());
  }, [form])

  return (
    <div className="right-container">
      <div className='form'>
      <div className="form-header">{subscription}</div>
      <form className='form-body' onSubmit={getTrial}>
          <input type="text" name='name' placeholder='User Name' required
                value={form.name} onChange={formInputChange}/>
          <input type="text" name="mail" placeholder='Email' required
                value={form.mail} onChange={formInputChange} />
          <input type="text" name='password' placeholder='Password' required
                value={form.password} onChange={formInputChange}/>
          
          <select className='skills-options' name="skills" onChange={handleSkillsChange} >
            <option value=""  >Select Skills</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Javascript">Javascript</option>
          </select>

          {
            form.skills &&(
              <div className='skills-display'>
                {
                  form.skills.map((skill)=>{
                    return (
                      <div className='skills-selected' key={skill}>
                        {skill} <span onClick={()=> handleRemoveSkill(skill)}>X</span>
                      </div>
                    )
                  })
                }
              </div>
            )
          }

        <button type="submit" className={btnActive ? 'form-btn-active' : 'form-btn'}
          onClick={isFormFilled}>
          CLAIM YOUR FREE TRIAL
        </button>

        <div className='disclaimer'>
          By clicking the button you are agreeing to our{" "}
          <span style={{ color: "red" }}>Terms and Services</span>
        </div>
      </form>
    </div>
    </div>
    
  )
}

export default RightContainer