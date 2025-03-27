import { useParams } from "react-router";
import { useOrigins } from "../OriginsContext";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Edit(){
    const { name } = useParams();

    const [oname, setName] = useState('');
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

    useEffect(() => {
        const originRef = doc(db, 'origins', name);
        getDoc(originRef).then((docSnap) => { 
            if(docSnap.exists()){
            const origin = docSnap.data();
            setName(origin.name);
            setHealth(origin.health_start);
            setIncrease(origin.increase_option || []);
            setBonus(origin.bonus_skills || {
                strength: [],
                smarts: [],
                speed: [],
                social: []
            });
            setLanguages(origin.languages);
            setBenefit(origin.origin_benefit);
        }})
    }, [name])

    const handleSubmit = (event) => {

        const cleanedBonus = Object.keys(bonus).reduce((acc, category) => {
            acc[category] = bonus[category].filter(skill => typeof skill === 'string' && skill.trim() !== '');
            return acc;
          }, {});


        console.log({name: oname, health_start: health, increase_option: increase, bonus_skills: cleanedBonus,
            languages: languages, origin_benefit: benefit
        })

        if(oname.length === 0){
            alert("You must have a non-empty Name!")
            return;
        }
        const originRef = doc(db, 'origins', name);

        setDoc(originRef, {
            name: oname,
            health_start: health,
            increase_option: increase,
            bonus_skills: cleanedBonus,
            languages: languages,
            origin_benefit: benefit
        }).then(() => {
            alert(`Origin ${oname} has been updated.`);
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
                    <input type="text" value={oname} onChange={(element) => {setName(element.target.value)}} />
                </label><br />
                <label><strong>Starting Health:</strong>
                    <input type="number" value={health} onChange={(element) => {setHealth(Number(element.target.value))}} />    
                </label><br />
                <label><strong>Increase Options:</strong>
                    <ul>
                        <li>Strength: <input type="checkbox" checked={increase.includes("Strength")} onChange={(element) => {
                            if(element.target.checked){
                                setIncrease([...increase, "Strength"])
                            } else {
                                setIncrease(increase.filter(item => item !== "Strength"))
                            }}}
                            /></li>
                        <li>Smarts: <input type="checkbox" checked={increase.includes("Smarts")} onChange={(element) => {
                            if(element.target.checked){
                                setIncrease([...increase, "Smarts"])
                            } else {
                                setIncrease(increase.filter(item => item !== "Smarts"))
                            }}}
                            /></li>
                        <li>Speed: <input type="checkbox" checked={increase.includes("Speed")} onChange={(element) => {
                            if(element.target.checked){
                                setIncrease([...increase, "Speed"])
                            } else {
                                setIncrease(increase.filter(item => item !== "Speed"))
                            }}}
                            /></li>
                        <li>Social: <input type="checkbox" checked={increase.includes("Social")} onChange={(element) => {
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
                    <input type="text" value={languages} onChange={(element) => {setLanguages(element.target.value)}}/>
                </label><br /><br />
                <label><strong>Origin Benefit:</strong>
                    <textarea value={benefit} onChange={(element) => {setBenefit(element.target.value)}} />
                </label>
            </form>
            <button onClick={handleSubmit} type="submit">Submit</button>
            <Link to={`/`}><button>Back</button></Link>
        </div>
    );
}

export default Edit;