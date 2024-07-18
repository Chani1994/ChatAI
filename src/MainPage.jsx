import React, { useState } from 'react';
import {sendToOpenAI} from './chat.js'
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Switch } from '@mui/material';
import img from './image/img.png'
const MainPage = () => {
  const [inputValues, setInputValues] = useState({
    eventType: '',
    blessingLength: '',
    k: '',
    atmosphereType: '',
    age: '',
    subEventType: '',
  });
  // const [result, setResult] = useState([]);//הערכים שיוחזרו יוכנסו למערך
  //   const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  //   const [isLoading, setIsLoading] = useState(false);

  const [generatedBlessing, setGeneratedBlessing] = useState('');
  const [inputClicked, setInputClicked] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(true);
  const [s, setSentence] = useState('');
  const [isRhymeEnabled, setIsRhymeEnabled] = React.useState(false);
  const [isSmaller, setIsSmaller] = useState(false);

  const handleSwitchChange = () => {
    setIsRhymeEnabled((prev) => !prev);
  };
  const handleChange = (e, inputName) => {
    setInputValues({
      ...inputValues,
      [inputName]: e.target.value
    });
  };

  const handleInputClick = () => {
    setInputClicked(true);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setGeneratedBlessing("");
    setIsSmaller(false);

  };

  const handleInputBlur = () => {
    setIsInputFocused(false);

  };
//   const handeleSearchBlessing = async () => {
//     const { eventType, blessingLength, atmosphereType, k, age,subEventType } = inputValues;
//     if (!eventType) {
//       alert('בבקשה בחר סוג ברכה');
//       return;
//     }
//     let sentence =
//      `כתוב 3 ברכות יפות וברמה גבוהה ואיכותית ל ${eventType}, באורך: ${blessingLength}, סגנון הכתיבה שיהיה: ${atmosphereType} ,ל ${k}`;

//     if (age) {
//       sentence += `, לגיל- ${age}`;
//     }
//     if(subEventType){
//       sentence += `, ל${subEventType} `;
//     }
//     if (isRhymeEnabled) {
//       sentence += ` בחריזה`;
//     }
//     else {
//       sentence += ` ללא חריזה.`
//     }
//     console.log(sentence)
//     try {
//       const openAIResult = await sendToOpenAI(sentence);
//       const parsedResult = JSON.parse(openAIResult);
//       if (Array.isArray(parsedResult.greetings)) {
//           setResult(parsedResult.greetings);
//       } else {
//           setResult([parsedResult.greeting || openAIResult]);
//       }
//       } catch (error) {
//       console.error("error in handeleSearchBlessing", error);
//       setResult(["ארעה שגיאה בעת הפניה ל OpenAI"])
//   } finally {
//       setIsLoading(false);
//   }

// };
// const handleNextGreeting = () => {
//   setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % result.length);
// };
    const generateSentence = async () => {
      const { eventType, blessingLength, atmosphereType, k, age,subEventType } = inputValues;
      if (!eventType) {
        alert('בבקשה בחר סוג ברכה');
        return;
      }
      let sentence =
       `כתוב ברכה ל ${eventType}, באורך: ${blessingLength}, סגנון הכתיבה שיהיה: ${atmosphereType} ל ${k}`;

      if (age) {
        sentence += `, לגיל- ${age}`;
      }
      if(subEventType){
        sentence += `, ל${subEventType} `;
      }
      if (isRhymeEnabled) {
        sentence += ` בחריזה`;
      }
      else {
        sentence += ` ללא חריזה.`
      }


      const response = await sendToOpenAI(sentence); // Assuming sendToOpenAI is defined elsewhere
      console.log(response)

      setGeneratedBlessing(response);
      setSentence(sentence);
      console.log(s)

      setIsInputFocused(false);

      if (response !== undefined) {
        setIsSmaller(true);
    } 
  }

  const handleNewBlessing = async () => {

    const { eventType, blessingLength, atmosphereType, k, age, subEventType } = inputValues;

    let sentence = `כתוב ברכה ל ${eventType}, באורך: ${blessingLength}, סגנון הכתיבה שיהיה: ${atmosphereType} ל ${k}`;

    if (age) {
      sentence += `, לגיל- ${age} `;
    }

    if (subEventType) {
      sentence += `, ל${subEventType} `;
    }
    if (isRhymeEnabled) {
      sentence += ` בחריזה`;
    }
    else {
      sentence += ` ללא חריזה.`
    }

    setSentence(sentence);
    console.log(s)
    const response = await sendToOpenAI(sentence); // Assuming sendToOpenAI is defined elsewhere
    console.log(response)

    setGeneratedBlessing(response);
    // setIsInputFocused(true)
    setSentence(sentence);
    if (response === undefined) {
      setIsSmaller(false);
    }
  };
    return (
      <>
      
      <img src={img}></img>
      <div style={{ textAlign: 'center' }}>
        <h1 >המברך יתברך </h1>
        <div>
          <FormControl fullWidth style={{ width: '100%' }} className={`element ${isSmaller ? "small" : ""}`}>
            <InputLabel id="event-type-label"> עבור מה הברכה?</InputLabel>
            <Select
              labelId="event-type-label"
              value={inputValues.eventType}
              onChange={(e) => handleChange(e, 'eventType')}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            >
              <MenuItem value="חתונה">חתונה</MenuItem>
              <MenuItem value="בר מצוה ">בר מצוה</MenuItem>
              <MenuItem value="ברית">ברית</MenuItem>
              <MenuItem value="יום הולדת">יום הולדת</MenuItem>
              <MenuItem value="יום נישואין">יום נישואין</MenuItem>
              <MenuItem value="ימות השנה">ימות השנה</MenuItem>
            </Select>
            {inputValues.eventType === 'יום הולדת' && (
              <TextField
                className={`element ${isSmaller ? "small" : ""}`}
                label="גיל"
                type='number'
                value={inputValues.age}
                onChange={(e) => handleChange(e, 'age')}
                fullWidth
                style={{ marginTop: '10px' }}
              />
            )}
            {inputValues.eventType === 'ימות השנה' && (
              <FormControl fullWidth style={{ width: '100%' }}>
                <InputLabel id="sub-event-type-label">בחר אירוע ממעגל השנה:</InputLabel>
                <Select
                  labelId="sub-event-type-label"
                  value={inputValues.subEventType}
                  onChange={(e) => handleChange(e, 'subEventType')}    >
                  <MenuItem value="פורים">פורים</MenuItem>
                  <MenuItem value="פסח">פסח</MenuItem>
                  <MenuItem value="תחילת שנה ">תחילת שנה</MenuItem>
                  <MenuItem value="סוף שנה">סוף שנה</MenuItem>
                </Select>
              </FormControl>
            )}
          </FormControl>
        </div>


        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              className={`element ${isSmaller ? "small" : ""}`}
              type="text"
              label="אורך הברכה"
              value={inputValues.blessingLength}
              onChange={(e) => handleChange(e, 'blessingLength')}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={`element ${isSmaller ? "small" : ""}`}
              type="text"
              label="קרבה"
              value={inputValues.k}
              onChange={(e) => handleChange(e, 'k')}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth style={{ width: '100%' }} className={`element ${isSmaller ? "small" : ""}`}>
              <InputLabel id="Writing Style">סגנון כתיבה</InputLabel>
              <Select
                label="Writing Style"
                value={inputValues.atmosphereType}
                onChange={(e) => handleChange(e, 'atmosphereType')}
                onClick={handleInputClick}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                fullWidth
              >
                <MenuItem value="שמח">שמח</MenuItem>
                <MenuItem value="מרגש">מרגש</MenuItem>
                <MenuItem value="מצחיק">מצחיק</MenuItem>
                <MenuItem value="מענין">מענין</MenuItem>
                <MenuItem value="משעשע">משעשע</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <p id="rhym">חריזה</p>
        <Switch checked={isRhymeEnabled} onChange={handleSwitchChange} className={`element ${isSmaller ? "small" : ""}`} />
        </div> 
          <div>
          <Button variant="contained" onClick={generateSentence}>כתוב ברכה</Button>
        </div>

         {generatedBlessing && (
          <div style={{ marginTop: 20 }}>

            {!isInputFocused && (
              <div className="greeting-box">
                {generatedBlessing}
              </div>
            )}
            {inputClicked && !isInputFocused && (
              <Button variant="outlined" onClick={handleNewBlessing}>אני רוצה ברכה אחרת</Button>
            )}

          </div>
  
        )}
      {/* </div>  */}

      {/* <Button variant="contained" className="button" onClick={handeleSearchBlessing} disabled={isLoading}>
                        {isLoading ? 'כותב...' : 'כתוב ברכה'}
                    </Button>
          <div>
                {result.length > 0 && (//רנדור של התוצאה
                <div className="greeting-container">
                    <div className="greeting-result">
                        {result[currentGreetingIndex].message}
                    </div>
                    <div>
                    <Button 
                        onClick={handleNextGreeting} 
                        variant="contained" 
                        color="primary"
                        disabled={currentGreetingIndex>=result.length-1}//בסוף הכפתור יושבת
                    >
                        {currentGreetingIndex < result.length - 1 ? 'החלף ברכה ' : 'סיום'}
                    </Button>
                    </div>
                </div>
                )}
            </div> */}
     </>
    );
  };
  export default MainPage;
