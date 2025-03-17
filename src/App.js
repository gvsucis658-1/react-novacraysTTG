import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

const data = [
  {name: 'Athletic', health_start: 2, increase_option: ['Strength', 'Speed'], 
      bonus_skills: {
        strength: ['Athletics', 'Brawn', 'Might'],
        smarts: ['None'],
        speed: ['Acrobatics', 'Finesse', 'Initiative'],
        social: ['None']
      },
      languages: 'Native and +1 for every 3 Social points.', 
      origin_benefit: `Always Training - You are used to always working out and physically training in your spare time. When making a Strength 
      or Speed-based skill check in a skill you do not possess levels in, you still roll a d2 skill die and do not suffer a Snag for being 
      untrained.`},
  {name: 'Brainy', health_start: 1, increase_option: ['Speed', 'Smarts'], 
    bonus_skills: {
      strength: ['None'],
      smarts: ['Alertness', 'Culture', 'Technology', 'Science'],
      speed: ['Driving', 'Infiltration'],
      social: ['None']
    },
      languages: 'Native and +1 for every Smarts point.', 
      origin_benefit: `I remember reading about...” - You have a vast array of knowledge that you have accumulated over the years, and occasionally 
      you might know a little bit about something useful in nearly any situation. In a situation where you and your allies are stumped, you can 
      always spend one Story Point from your pool to gain a clue from the GM.`},
  {name: 'Curious', health_start: 1, increase_option: ['Smarts', 'Social'], 
    bonus_skills: {
      strength: ['None'],
      smarts: ['Alertness', 'Culture', 'Technology'],
      speed: ['None'],
      social: ['Deception', 'Persuasion', 'Streetwise']
    },
      languages: 'Native and +1 for every 2 Smarts points.', 
      origin_benefit: `Secret Knowledge - You have been able to learn something others have not, and may choose a General Perk you meet the 
      prerequisites, if any, to possess.`},
  {name: 'Popular', health_start: 1, increase_option: ['Strength', 'Social'], 
    bonus_skills: {
      strength: ['Athletics', 'Intimidation'],
      smarts: ['None'],
      speed: ['None'],
      social: ['Performance', 'Persuasion', 'Streetwise']
    },
      languages: 'Native and +1 for every 3 Social points.', 
      origin_benefit: `Are You Who I Think You Are? - You have learned, possibly just accidentally, how to use your popularity as a method to 
      get the results you are looking for in social circles. Whenever you are in a position to be recognized as a local social celebrity, 
      you can always consider yourself as having an applicable Specialization in Deception, Persuasion, or Streetwise.`},
  {name: 'Tragic', health_start: 2, increase_option: ['Strength', 'Smarts', 'Social', 'Speed'], 
    bonus_skills: {
      strength: ['Athletics', 'Brawn'],
      smarts: ['Alertness', 'Culture', 'Survival'],
      speed: ['Driving', 'Infiltration'],
      social: ['Deception', 'Streetwise']
    },
      languages: 'Native and +1 for every 2 Social points.', 
      origin_benefit: `Capable of Anything - You do not let your past define you, but it has made you stronger against the odds. Once per scene, 
      you may re-roll any die result of a 1, but you must accept the new result.`}
];

function App() {

  const [origins, setOrigins] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedOrigin, setEditedOrigin] = useState(null);
  const [currentIndex, setIndex] = useState(0);

  function OptionAndSkills({increase_options}){
    return (
      <ul>{
        increase_options.map((item, index) => (
          <li key={index}>{item}</li>
        ))
      }</ul>
    );
  }

  function BonusSkills({bonus_skills}){
    return (
      <ul>
        <li>Strength: <OptionAndSkills increase_options={bonus_skills.strength} /></li>
        <li>Smarts: <OptionAndSkills increase_options={bonus_skills.smarts} /></li>
        <li>Speed: <OptionAndSkills increase_options={bonus_skills.speed} /></li>
        <li>Social: <OptionAndSkills increase_options={bonus_skills.social} /></li>
      </ul>
    );
  }

  function Origin({name, health_start, increase_option, bonus_skills, languages, origin_benefit}){
    return <div>
      <h2>Name: {name}</h2>
      <p><em>Starting Health:</em> {health_start}</p>
      <p><em>Increase Option:</em></p>
      <OptionAndSkills increase_options={increase_option}/>
      <p><em>Bonus Skills:</em></p>
      <BonusSkills bonus_skills={bonus_skills} />
      <p><em>Languages:</em> {languages}</p>
      <p><em>Origin Benefit:</em></p>
      <p>{origin_benefit}</p>
    </div>
  }

  function handleEditClick(index){
    setEditedOrigin({...origins[index]});
    setIsEditing(true);
    setEditIndex(index);
    setIndex(index);
  }

  function handleInputChange(value, field){
    setEditedOrigin(prevState => ({ ...prevState, [field]: value.target.value }));
  }

  function handleIncreaseOptionChange(value, index){
    setEditedOrigin(prevState => {
      const updatedIncreaseOptions = [...prevState.increase_option];
      updatedIncreaseOptions[index] = value.target.value;
      return {
          ...prevState,
          increase_option: updatedIncreaseOptions
      };
  });
  }

  function handleBonusSkillsChange(value, category, index){
    setEditedOrigin(prevState => {
      const updatedBonusSkills = { ...prevState.bonus_skills };
      updatedBonusSkills[category] = [...updatedBonusSkills[category]]; // Ensure immutability
      updatedBonusSkills[category][index] = value.target.value;
      
      return {
          ...prevState,
          bonus_skills: updatedBonusSkills
      };
  });
  }

  function handleSave(){
    const updatedOrigins = [...origins];
    updatedOrigins[editIndex] = editedOrigin;
    setOrigins(updatedOrigins);
    setIsEditing(false);
    setEditIndex(null);
  }

  function OriginList({title, origins}){
    const origin = isEditing ? origins[editIndex] : origins[currentIndex];
    if(isEditing && editIndex === currentIndex){
      return <section>
          <h3>Edit {origin.name}</h3>
          <form>
          <label>Name:
            <input type="text" value={editedOrigin.name} onChange={(value) => handleInputChange(value, 'name')} />
          </label>
          <br />
          <label>Starting Health:
            <input type="number" value={editedOrigin.health_start} onChange={(value) => handleInputChange(value, 'health_start')} />
          </label>
          <br />
          <label>Increase Options:</label>
          <ul>
            {editedOrigin.increase_option.map((item, index) => (
              <li key={index}>
                <input type="text" value={item} onChange={(value) => handleIncreaseOptionChange(value, index)} />
              </li>
            ))}
          </ul>
          <br />
          <label>Bonus Skills:</label>
          <ul>
            {Object.keys(editedOrigin.bonus_skills).map((category) => (
              <li key={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}:
                <ul>
                  {editedOrigin.bonus_skills[category].map((skill, index) => (
                    <li key={index}>
                      <input type="text" value={skill} onChange={(value) => handleBonusSkillsChange(value, category, index)} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <br />
          <label>Languages:
            <input type="text" value={editedOrigin.languages} onChange={(value) => handleInputChange(value, 'languages')} />
          </label>
          <br />
          <label>Origin Benefit:
            <textarea value={editedOrigin.origin_benefit} onChange={(value) => handleInputChange(value, 'origin_benefit')} />
          </label>
          <br />
          </form>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
      </section>
    } else {
      return <section>
        <button id='Previous' onClick={() => {
            setIndex((currentIndex - 1 + origins.length) % origins.length);
        }}>Previous</button>
        <button id='Next' onClick={() => {
            setIndex((currentIndex + 1) % origins.length);
        }}>Next</button>

        <h1> {title} </h1>
        <div className='origins' >
          <Origin index={currentIndex + 1} {...origin} />
        </div>
        <button id="Edit" onClick={() => {
            handleEditClick(currentIndex);
        }}>Edit</button>
    </section>
    }
  }

  return (
    <OriginList title="List of Origins for Power Rangers" origins={origins}/>
  );
}

export default App;
