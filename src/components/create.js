import { useParams } from "react-router";
import { useOrigins } from "../OriginsContext";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Create(){
    const [name, setName] = useState('');
    const [health, setHealth] = useState(0);
    const [increase, setIncrease] = useState([]);
    const [bonus, setBonus] = useState({
        strength: [],
        smarts: [],
        speed: [],
        social: []
    });
    const [languages, setLanguages] = useState('');
    const [benefit, setBenefit] = useState('');

    const handleSubmit = (event) => {

        const cleanedBonus = Object.keys(bonus).reduce((acc, category) => {
            acc[category] = bonus[category].filter(skill => typeof skill === 'string' && skill.trim() !== '');
            return acc;
          }, {});


        console.log({name: name, health_start: health, increase_option: increase, bonus_skills: cleanedBonus,
            languages: languages, origin_benefit: benefit
        })

        if(name.length === 0){
            alert("You must have a non-empty Name!")
            return;
        }

        const originRef = doc(db, 'origins', name)

        setDoc(originRef, {
            name: name,
            health_start: health,
            increase_option: increase,
            bonus_skills: cleanedBonus,
            languages: languages,
            origin_benefit: benefit
        }).then(() => {
            alert(`Origin ${name} has been created.`);
            setName('');
            setHealth(0);
            setIncrease([]);
            setBonus({
                strength: [],
                smarts: [],
                speed: [],
                social: []
            });
            setLanguages('');
            setBenefit('');
        })
    }

    const handleAddSkill = (category, skill) => {
        if (skill && !bonus[category].includes(skill)) {
            setBonus({
            ...bonus,
            [category]: [...bonus[category], skill],
            });
        }
        console.log(bonus)
    };
    
    const handleRemoveSkill = (category, skill) => {
        setBonus({
        ...bonus,
        [category]: bonus[category].filter(item => item !== skill),
        });
    };
    

    return(
        <div>
            <form>
                <label><strong>Name:</strong>
                    <input type="text" placeholder={'Give the origin a name!'} onChange={(element) => {setName(element.target.value)}} />
                </label><br />
                <label><strong>Starting Health:</strong>
                    <input type="number" placeholder={0} onChange={(element) => {setHealth(Number(element.target.value))}} />    
                </label><br />
                <label><strong>Increase Options:</strong>
                    <ul>
                        <li>Strength: <input type="checkbox" onChange={(element) => {
                            if(element.target.checked){
                                setIncrease([...increase, "Strength"])
                            } else {
                                setIncrease(increase.filter(item => item !== "Strength"))
                            }}}
                            /></li>
                        <li>Smarts: <input type="checkbox" onChange={(element) => {
                            if(element.target.checked){
                                setIncrease([...increase, "Smarts"])
                            } else {
                                setIncrease(increase.filter(item => item !== "Smarts"))
                            }}}
                            /></li>
                        <li>Speed: <input type="checkbox" onChange={(element) => {
                            if(element.target.checked){
                                setIncrease([...increase, "Speed"])
                            } else {
                                setIncrease(increase.filter(item => item !== "Speed"))
                            }}}
                            /></li>
                        <li>Social: <input type="checkbox" onChange={(element) => {
                            if(element.target.checked){
                                setIncrease([...increase, "Social"])
                            } else {
                                setIncrease(increase.filter(item => item !== "Social"))
                            }}}
                            /></li>
                    </ul>
                </label><br />
                <label><strong>Bonus Skills:</strong>
                <div>
                <span style={{display: "inline-block"}}>
                <p>Strength Skills:</p>
                <input
                    type="text"
                    placeholder="Add strength skill"
                    onBlur={(element) => handleAddSkill('strength', element.target.value)}
                />
                </span>
                <ul>
                    {bonus.strength.map((skill, index) => (
                    <li key={index}>
                        {skill} <button type="button" onClick={() => handleRemoveSkill('strength', skill)}>Remove</button>
                    </li>
                    ))}
                </ul>
                <span style={{display: "inline-block"}}>
                <p>Smarts Skills:</p>
                <input
                    type="text"
                    placeholder="Add smarts skill"
                    onBlur={(element) => handleAddSkill('smarts', element.target.value)}
                />
                </span>
                <ul>
                    {bonus.smarts.map((skill, index) => (
                    <li key={index}>
                        {skill} <button type="button" onClick={() => handleRemoveSkill('smarts', skill)}>Remove</button>
                    </li>
                    ))}
                </ul>
                <span style={{display: "inline-block"}}>
                <p>Speed Skills:</p>
                <input
                    type="text"
                    placeholder="Add speed skill"
                    onBlur={(element) => handleAddSkill('speed', element.target.value)}
                />
                </span>
                <ul>
                    {bonus.speed.map((skill, index) => (
                    <li key={index}>
                        {skill} <button type="button" onClick={() => handleRemoveSkill('speed', skill)}>Remove</button>
                    </li>
                    ))}
                </ul>
                <span style={{display: "inline-block"}}>
                <p>Social Skills:</p>
                <input
                    type="text"
                    placeholder="Add social skill"
                    onBlur={(element) => handleAddSkill('social', element.target.value)}
                />
                </span>
                <ul>
                    {bonus.social.map((skill, index) => (
                    <li key={index}>
                        {skill} <button type="button" onClick={() => handleRemoveSkill('social', skill)}>Remove</button>
                    </li>
                    ))}
                </ul>
                </div>
                </label><br />
                <label><strong>Languages:</strong>
                    <input type="text" placeholder={'Add languages'} onChange={(element) => {setLanguages(element.target.value)}}/>
                </label><br /><br />
                <label><strong>Origin Benefit:</strong>
                    <textarea placeholder={'Add origin benefit'} onChange={(element) => {setBenefit(element.target.value)}} />
                </label>
            </form>
            <button onClick={handleSubmit} type="submit">Submit</button>
            <Link to={`/`}><button>Back</button></Link>
        </div>
    );
}

export default Create;