import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { MdEditOff } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import { RiSaveFill } from "react-icons/ri";
import  { MdBookmarkAdded } from "react-icons/md";
import { ThreeCircles  } from 'react-loader-spinner'
import { toast } from "react-toastify";

const Summary = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const draftt = location.state?.cleaneddraft;
    const patient_name = location.state?.patient_name;
    const uhid = location.state?.uhid;
    const encounter = location.state?.encounter;
    const doctor = location.state?.doctor;
    const labreport =  location.state?.labreport || "no lab report" ; /* "https://drive.google.com/file/d/13Qy8qW0BpScTZJYPm7U1-teV0rrJqzEP/view?usp=sharing"; */
    console.log("aisumm",labreport)
    console.log("Doctor:", doctor)
    const draft = JSON.stringify(draftt, null, 2);
    console.log("The draft", draft);
    const currentdate = new Date();
    const offset = 5.5 * 60 * 60 * 1000; 
    const indianDate = new Date(Date.now() + offset);
    const userid = localStorage.getItem("userid")
    const [confirmsave, setconfirmsave] = useState(false)
    const [confirmcomlete, setconfirmcomlete] = useState(false)
    const[editable, seteditable] = useState(true)
    const [formattedText, setFormattedText] = useState("");
    const editableRef = useRef(null);
    const[load, setload] = useState(true) 
    const backendurl = import.meta.env.VITE_BACKEND_BASURL;
    const [html, sethtml] = useState("")
    
  
    useEffect(() => {
      handleSubmit();
    }, []);
    
    useEffect(() => {
      if (editableRef.current && formattedText) {
        editableRef.current.innerHTML = formattedText;
      }
    }, [formattedText]);

    const showsave = () => {
      setconfirmsave(true)
    }

    const showcompl = () => {
      setconfirmcomlete(true)
    }


    const handleSubmit = async () => {
      
        const requestData = {
          "model": "gpt-4o",
          "messages": [
            {
              "role": "system",
              "content": "Format the patient details properly."
            },
            {
              "role": "user",
              "content": `
                Generate a professional, comprehensive **Discharge Summary** (maximum 4 pages) using the provided clinical data and lab report. Follow standard **ICD-10 medical protocols** and hospital policy. Ensure the output is grammatically correct, clearly formatted, and ready for inclusion in final patient discharge documentation.

                Output must be in **HTML format**.

                Inputs contain keywords—expand into full sentences with proper detail
                If there are any mismatches (e.g., blood group mismatch, diagnosis not suitable for patient's gender or age), highlight them using:
                <span style='color:red'>ALERT</span>
                Review all possible issues in the input data.

                ### Input Parameters
                - Content: ${draft} (includes clinical notes and structured fields; correlate findings with clinical data)
                

                ### Output Instructions (Must Include):

                {**DISCHARGE SUMMARY** 
               
                (Use <h3> i need it to show in center align this heading only others are as usual left tag. for this heading **do not use #### or backticks with html and  **)}

                {**PATIENT INFORMATION:**  
                (Use <p><u><b> i need line by line dont use list tag tag; do not use ####)
                Must Need <br> after this content}

                {**DIAGNOSIS:**  
                (<p><u><b>i need line by line dont use list tag) 
                - Diagnosis content only need in bold
                - I need it in capital letter and just show what in input for diagnosis don't generate any sentence for diagnosis
                - Cross-check diagnosis with patient's **gender and age**.  
                - If a contradiction is found, highlight it with <span style='colo
                
                +r:red'>ALERT Message</span> and suggest correction.  
                - Diagnosis starting with "?" means suspected diagnosis. Must Need <br>fter this content}

               {**PROVISIONAL DIAGNOSIS:**  
                (<p><u><b>  i need line by line dont use list tag)  
                - Diagnosis content only need in bold
                - generate  only if Provisional diagnosis present in the inputother wise dont show anything even heading
                - I need it in capital letter and just show what in input for diagnosis don't generate any sentence for diagnosis
                - Cross-check diagnosis with patient's **gender and age**.  
                - If a contradiction is found, highlight it with <span style='color:red'>ALERT Message</span> and suggest correction.  
                - Diagnosis starting with "?" means suspected diagnosis. Must Need <br>fter this content}

                {**INDICATIONS:**  
                (<p><u><b>) 
                -  Must Include **if indication present in the input(under obs department other wise dont show anything even heading) **
                - I need it in capital letter and just show what in input for indications don't generate any sentence for indications
                - If a contradiction is found, highlight it with <span style='color:red'>ALERT Message</span> and suggest correction.}

                {**SURGERY DONE ON "surgery date":**  
                - surgery content only need in bold
                  Must Include **only if data contains surgeries array**. Show:
                - Only surgery name is needed in caps letter others no need here(like surgeon name, assistant surgeon etc....) 
                - Use <p><u><b> for the heading. Must Need <br>after this content}

                {**PROCEDURE  DONE ON "procedure date":**  
                - procedure content only need in bold
                  Must Include **only if data contains procedures array**. Show:
                - Only procedure name is needed in caps letter others no need here(like surgeon name, assistant surgeon etc....)
                - Use <p><u><b> for the heading. Must Need <br>after this content}


                {**CHIEF COMPLAINTS:**  
                  (<p><u><b> i need line by line dont use list tag)  
                  Need elobrated senetence for this
                  - Start sentence with Complaints of .....
                
                - Again, cross-check with gender and age.   
                - Must Need <br> after this content}

                {**OBSTETRIC HISTORY:**  
                If obs_ or gyn_ exists, show:
                - gyn_obstetric_history or obs_obstetric_history
                - make sentence for this with approprite inputs
                - Heading: <p><u><b>Must Need <br> after this content}


                 {**MENSTRUAL HISTORY:**  
                  Include only if data contains obs_ keys. Show:
                  Headings are Menstrua History, LMP, EDD 
                  - make sentence for this with approprite inputs
                  -  obs_menstrual_history      
                  - Heading: <p><u><b>Must Need <br> after this content}

                {**MARITAL HISTORY:**  
                Same condition as above. Show:
                - obs_marital_history
                - make sentence for this with approprite inputs
                - Heading: <p><u><b>Must Need <br> after this content}

                {**GRAVIDA:**  
                If obs_gravida exists, show:
                - make sentence for this with approprite inputs
                - Heading: <p><u><b>Must Need <br> after this content}

                {**APPGAR:**  
                If obs_appgar exists, show:
                - make sentence for this with approprite inputs
                - Heading: <p><u><b>Must Need <br> after this content}

                 {**DELIVERY MODE:**  
                  If obs_delivery_mode exists, show:
                  - make sentence for this with approprite inputs
                  - Heading: <p><u><b>Must Need <br> after this content}

                    {**BABY GENDER:**  
                  If obs_baby_gender exists, show:
                  - Heading: <p><u><b>Must Need <br> after this content}

                    {**LIVE BIRTH:**  
                  If obs_live_birth exists, show:
                  - make sentence for this with approprite inputs
                  - Heading: <p><u><b>Must Need <br> after this content}

                    {**BABY WEIGHT:**  
                  If obs_baby_weight exists, show:
                  - make sentence for this with approprite inputs
                  - Heading: <p><u><b>Must Need <br> after this content}

                


                {**HISTORY OF PRESENT ILLNESS:**  
                (<p><u><b> i need line by line dont use list tag)  
                - i must need in unorderlist but no list decoration like -, dots,
                 - **generate  only if history_of present_illness_present in the input other wise dont show anything even heading**
                - Again, cross-check with gender and age.   
                - Must Need <br> after this content}

                

                {**FAMILY HISTORY:**  
                (<p><u><b> i need line by line dont use list tag)  
                - i must need in unorderlist but no list decoration like -, dots,
                 - **generate  only if family_history in the input other wise dont show anything even heading**  
                 - make sentence for this with approprite inputs
                -  Must Need <br> after this content}

                {**LIFE STYLE HISTORY:**  
                (<p><u><b>  i need line by line dont use list tag)  
                - i must need in unorderlist but no list decoration like -, dots,
                 - **generate  only if life_style_history in the input other wise dont show anything even heading**  
                 - make sentence for this with approprite inputs
                -  Must Need <br> after this content}

              

                {**PAST MEDICAL HISTORY:**  
                (<p><u><b> should be line by line but dont use list tag)  
                - i must need in unorderlist but no list decoration like -, dots,
                If not present, write: "No past medical history" after the heading parallely. dont show "Nill". Must Need <br> after this content}

                {**PAST SURGICAL HISTORY:**  
                (<p><u><b> i need line by line dont use list tag)  
                - i must need in unorderlist but no list decoration like -, dots,
                If not present, write: "No past surgical history" after the heading parallely. dont show "Nill" Must Need <br> after this content}

                {**DRUG ALLERGY:**  
                (<p><u><b> i need line by line dont use list tag)  
                - i must need in unorderlist but no list decoration like -, dots,
                - make sentence for this with approprite inputs
                If not provided, write: "Not known drug allergy" after the heading parallely. dont show "Nill" Must Need <br> after this content}

                {**CLINICAL EXAMINATION:**  
                (<p><u><b>  all properties of the object should be line by line but dont use list tag)  
                - Each property value in the  input should be single line 
                - property : value(in single like Patient : conscious, oriented, afebrile)
                - Dont make any sentence show whats in input for the field otherwise dont form any sentence.
                - if a property has value then must show the input dont avoid propeties with values
                - And i need /min as suffix for PR and RR 
                - And i need mmHG as suffix for BP
                - Must Need <br> after this content}

                
                
                {**INVESTIGATION:**  
                (<p><u><b>)
                
                Must show only if X-Ray(x_ray_findings) is present otherwise dont show the heading too.(also for :USG(ultrasound_findings), ECHO(echo_findings), CT(ct_findings), MRI(mri_findings), ECG(ecg_findings), EEG(eeg_findings), UROFLOWMETRY(uroflowmetry_findings), LAB FINDINGS(lab_findings), IMAGE FINDINGS(image_findings) )  
                (for example if x-ray has any value and ecg ha nothing then show x-ray )
                If not present, write: "Reports enclosed".Must Need <br> after this content
                 
                - make sentence for this with approprite inputs for each headings}



                {**COURSE IN HOSPITAL:**  
                (<p><u><b>)  
                Need patient demographic, medicatons, treatment histories all the relevent details with enlarge paragraph atleast 4 line is needed
                Provide elaborated details.Must Need <br> after this content}



                {**OPERAIVE NOTES:** i need it to show in center align with <p><b> this heading only(OPERATIVE NOTES) others are as usual left tag(LIKE SURGERY DATE, SURGERY ETC).) 
                 MustInclude only if data contains surgeries object other wise dont show this content heading too it contains array of object all object need in following format. Use <p><u><b>  i need line by line for each property dont use list tag and must include in the followingorder:
                - SURGERY DATE : surgery_date(must include <br>Also property and value should be in bold)
                - SURGERY : surgery  (must include. Also property and value should be in bold) <br>
                - SURGEON NAME :  surgeon_name  (must include. Also property and value should be in bold) <br>
                - ASSISTANT SUREON NAME :  assistant_surgeon_name  (must include. Also property and value should be in bold) <br>
                - ANAESTHETIST NAME :  anaesthetist_name  (must include. Also property and value should be in bold) <br>
                - ANAESTHESIA :  anaesthesia  (must include. Also property and value should be in bold) <br>
                - FINDINGS : findings  (must include. Also property and value should be in bold) <br>
                - OPERATIVE NOTES :<br>(need a br after this heading) operative_notes (must include.. Also heading should be in bold.just show what in the input field for this dont make any sentence. it should be static) <br>
                - POST OPERATIVE NOTES : <br>(need a br after this heading)post_operative_notes  (must include. Also heading should be in bold. Make a sentence using the post operative notes. in case anything happening after the surgery mention in the course in the hospital  then take input from  the course in the hospital) 
                  Notes must be detailed (2-3 line para if possible). Pull content from both operative_notes and post_operative_notes. Include relevant protocols (ISO 9001, SOPs, etc.)
                  operative notes and post operative notes are seperate heading dont join it in single para. must be as a seperate headings}


                  {**PROCEDURE:**  i need it to show in center align this heading only(PROCEDURES) others are as usual left tag(LIKE PROCEDURE DATE, PROCEDURE ETC).) 
                  MustInclude only if data contains procedures object other wise dont show this content heading too it contains array of object all object need in following format. Use <p><u><b> i need line by line for each property dont use list tag and include in order:
                  - PROCEDURE DATE : procedure_date(must include <br> Also property and value should be in bold)
                  - PROCEDURE : surgery  (must include. Also property and value should be in bold) <br>
                  - SURGEON NAME :  surgeon_name  (must include. Also property and value should be in bold) <br>
                  - ASSISTANT SUREON NAME :  assistant_surgeon_name  (must include. Also property and value should be in bold) <br>
                  - ANAESTHETIST NAME :  anaesthetist_name  (must include. Also property and value should be in bold) <br>
                  - ANAESTHESIA :  anaesthesia  (must include. Also property and value should be in bold) <br>
                  - FINDINGS :<br>(need a br after this heading) findings  (must include. Also heading should be in bold) <br>
                  - OPERATIVE NOTES :<br>(need a br after this heading) operative_notes (must include.. Also heading should be in bold.just show what in the input field for this dont make any sentence. it should be static) <br>
                  - POST OPERATIVE NOTES :<br>(need a br after this heading) post_operative_notes  (must include. Also heading should be in bold. in case anything happening after the surgery mention in the course in the hospital  then take input from  the course in the hospital) 
                    Notes must be detailed (2-3 line para if possible). Pull content from both operative_notes and post_operative_notes. Include relevant protocols (ISO 9001, SOPs, etc.)
                    operative notes and post operative notes are seperate heading dont join it in single para. must be as a seperate headings}


                {**TREATMENT GIVEN:** only show if treatment given object is there otherwise dont generate anything even the heading too 
                (<p><u><b> should be line by line but dont use list tag) 
                must list all medications
                - All i need in caps letter
                 - I need the g,mg like values in small letter
                    Format strictly as: MedicineName Dosage(qty should be small letter) frequency(it should be 1 - 0 - 1 format. dont generate BD, like that ) route.
                - Verify and highlight abnormal dosages by wrapping them in <span style='color:red'>ALERT</span> 
                - Also if a medicine contain like 1tab something show 1tab dont show only tab. even 1 is also importat. 
                - Consider patient age, gender, diagnosis, and guidelines.Must Need <br> after this content}


                {**CONDITION AT DISCHARGE:**  
                (<p><u><b> all properties of the object should be line by line but dont use list tag)  
                - Each property value in the  input should be single line 
                - property : value(in single like)
                - if a property has value then must show the input dont avoid propeties with values
                - Dont make any sentence show whats in input for the field otherwise dont form any sentence.
                - And i need /min as suffix in PR and RR
                - Must Need <br> after this content}


                

                

                {**ADVISE ON DISCHARGE:**  
                (<p><u><b> should be line by line but dont use list tag).
                
                    I need four heading under this() Advice medication)
                    DIET : need the diet input here should be line by line but dont use list tag(give elobrated as per the input)- if no diet input there then must dont show ( make sentence for this with approprite inputs).
                    INSTRUCTION : need the instruction input here should be line by line but dont use list tag(give elobrated as per the input)- if no instruction input there then must dont show( make sentence for this with approprite inputs).
                    ADVICE MEDICATION : (only show if advice medication is there otherwise dont generate even the heading need the advice medication input here in table All i need in caps letter
                    **Must generate all medicines in the object**
                   - I need in table. s.no column MUST.
                   - Also if a medicine contain like 1tab something show 1tab dont show only tab. even 1 is also importat.
                   - Column must include SL NO, MEDICATION NAME(the name should be as per in the input medicine also medicine name must in caps), DOSE(i need dosage and qty here but heading should be "Dose" value should be like : 10gm - small letter), ROUTE, FREQUENCY(i need frequency and food timing also in this column under "Frequency" heading like 1 - 0 - 1 (AFTER FOOD)) and DURATION.
                   - I need the g,mg like values in small)
                   FOLLOW UP : need the follow up input here should be line by line but dont use list tag(it inclde the emergency number to with doctor profile, - make sentence for this with approprite inputs )
                     - if no advice medication input there then must dont show.
                  Must Need <br> after this content}


                {**DRUG INTERACTION & SAFETY EVALUATION:** 
                (<p><u><b>)  
                Evaluate:  
                - Drug-drug interactions  
                - Food-drug interactions  
                - Age/gender-based interactions  
                If any department-specific fields exist (obs_, gyn_, s_, ivf_), generate a section with detailed notes; otherwise, do not include this section.Must Need <br> after this content}

                ### Formatting Guidelines
                - Summary should span ideally **3 to 5 pages**  
                - Clean structure, no backticks or ####  
                - Avoid one-word answers; elaborate using professional medical language  
                - All alerts must use: <span style='color:red'>ALERT</span> 
                - Need <br> for each content to beautify the readability
                - tables need with border 1
    
              `
              
            }
          ]
        };
    
        try {
          console.log("Api Request data", requestData)
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
           /*  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAyAb1NFDSI2WsnJh4wW2ewI6s5wPswcjc", */
            {
              
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer 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",
              },
              body: JSON.stringify(requestData),
            }
          );
          
    
          const responseData = await response.json();
          const textResponse =  responseData?.choices?.[0]?.message?.content || "No response text found";
          console.log("Extracted Text:", textResponse);

          /* let formatted = textResponse.replace(``````, html).replace( <span> </span>); */
          toast.success("Ai Summary Generated Successfly")
          setFormattedText(textResponse);
          setload(false)
        } catch (error) {
          console.error("Error sending request:", error);  
          toast.error("Ai Summary Generated Failed")
        }finally {
          console.log("ff")
        /*   toast.error("Ai Summary Generated Failed") */
        }
        
      };

/* 
      {**LAB REPORT**  
        (<p><u><b><table>)  
        - Must Show the all lab values neatly even it is normal in table with date
        - Abnormal values should be highlighted in red with a warning.Must Need <br> after this content
        - make sentence for this with approprite inputs end of report and give your highlight
        } */

      const submitsummary = async() => {
        const updatedText = editableRef.current?.innerHTML || formattedText;
        setFormattedText(updatedText);
        try {
          const res = await fetch(`${backendurl}/summary`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              summary : formattedText,
              patient_name : patient_name,
              uhid : uhid,
              doneby : userid,
              encounter : encounter,
              doctor: doctor,
              createdtime : indianDate,
              lastmodified : indianDate,
              status : "pending"
            }),
          });
          const data = await res.json();
         /*  console.log("Saved summary:", data); */
         
         sethtml(editableRef.current?.innerHTML)
         console.log("summ")
         console.log("summ",html)
          toast.success("Ai Summary Saved Successfully")
          setconfirmsave(false)
        } catch (error) {
          console.error("Error while pushing summary :", error)
          toast.success("Ai Summary Failed to save")
        }
      }

      const deletedraft = async (uhid) => {
        try {
          const res = await axios.delete(`${backendurl}/draft/${uhid}`);
          console.log("Deleted:", res.data);
          navigate("/")
        } catch (err) {
          console.error("Delete error:", err);
        }
      };

      
      const completesummary = async() => {
        try {
          const res = await fetch(`${backendurl}/summary`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              summary : formattedText,
              uhid : uhid,
              doneby : userid,
              encounter : encounter,
              doctor: doctor,
              createdtime : indianDate,
              lastmodified : indianDate,
              status : "complete"
            }),
          });
          const data = await res.json();
          console.log("Saved summary:", data);
          seteditable(false)
          setconfirmcomlete(false)
          toast.success("Ai Summary Finished Successfully")
          /* deletedraft(uhid) */
        } catch (error) {
          console.error("Error while pushing summary :", error)
          toast.error("Ai Summary Failed to Finish")
        }
      }

        const copysummary = () => {
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(editableRef.current?.innerHTML)
              .then(() => {
                toast.success("Summary copied!");
              })
              .catch(err => {
                console.error('Failed to copy: ', err);
                toast.error("Copy failed");
              });
          } else {
            const textArea = document.createElement("textarea");
            textArea.value = editableRef.current?.innerHTML;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
        
            try {
              document.execCommand('copy');
              toast.success("Summary copied!");
            } catch (err) {
              console.error('Fallback: Copy failed', err);
              toast.error("Copy failed");
            }
        
            document.body.removeChild(textArea);
          }
        }

       

      return (
        <div className="m-6">

          <div className="innerpagehead">
            <p className="innerpagetext">Edit Summary <MdEditDocument /></p> 
            <div className="flex gap-12 px-7">
               <div className="copybutton bg-black"> <button    className="flex items-center gap-2 " onClick={copysummary} >Copy <RiSaveFill /></button></div> 
              <div className="savebutton"> <button className="flex items-center gap-2 " onClick={() => showsave()} >Save <RiSaveFill /></button></div>
               {/* <div className="finishbutton"> <button className="flex items-center gap-2"  onClick={() => showcompl()} >Finish <MdBookmarkAdded /></button></div> */}
            </div>
          </div>





          {editable === false && (
            <p className="text-red-500 px-12 pt-4 italic text-sm">
              This summary has been finalized and now read-only.
            </p>
          )}

       
        {
          load? (
            <div className="flex mt-64 w-full justify-center items-center">
                  <ThreeCircles
                  visible={true}
                  height="100"
                  width="100"
                  color="gray"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  /></div>

          ):(
            
                  
                  <div
                      ref={editableRef}
                      className="mt-10 text-lg border outline-none border-gray-300 rounded p-10 hover:border-blue-400 transition-all duration-200 bg-white min-h-[200px]  summary " 
                      
                      contentEditable={editable}
                      style={{
                        pointerEvents: editable ? "auto" : "none",
                        backgroundColor: editable ? "white" : "#f3f4f6",
                        fontFamily: "Poppins, sans-serif",
                        lineHeight : 2
                      }}
                    />

                  
          )
        }
          
        
            
       {/*   <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => window.print()} > Print </button> */}


            <Dialog open={confirmsave} onClose={() => setconfirmsave(false)} >
                <div className="digone" aria-hidden="true" />
                <div className="digtwo">
                    <Dialog.Panel className="digthree">
                    <Dialog.Title className=" digtitle">
                        <FaQuestionCircle  className='text-6xl text-amber-600'/>
                        <p className='text-3xl '>Are Sure  to Save Summary?</p>
                    </Dialog.Title>

                    <Dialog.Description className="mb-4 text-gray-600">
                       <p className="text-base text-center  flex justify-center items-center gap-1.5 pb-2 text-green-600">You can edit after you saved<RiEdit2Fill /></p>
                    </Dialog.Description>

                    <div className='pb-8  flex justify-evenly'>
                        <div className='digno'>
                            <button className='diginnerbut' onClick={() => setconfirmsave(false)} >
                            No<FaThumbsDown className='text-xl'/>
                        </button></div>

                        <div className='digyes'>
                            <button className='diginnerbut' onClick={() => submitsummary()} >
                            Yes<FaThumbsUp  className='text-xl'/>
                        </button></div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <Dialog open={confirmcomlete} onClose={() => setconfirmcomlete(false)} >
                <div className="digone" aria-hidden="true" />
                <div className="digtwo">
                    <Dialog.Panel className="digthree">
                    <Dialog.Title className=" digtitle">
                        <FaQuestionCircle  className='text-6xl text-amber-600'/>
                        <p className='text-3xl '>Are Sure  to Complete Summary?</p>
                    </Dialog.Title>
                    <Dialog.Description className="mb-4 text-gray-600">
                       <p className="text-base text-center  flex justify-center items-center gap-1.5 pb-2 text-red-600 ">You cann't edit after you Finished <MdEditOff /></p>
                    </Dialog.Description>
                    <div className='pb-8  flex justify-evenly'>
                        <div className='digno'>
                            <button className='diginnerbut' onClick={() => setconfirmcomlete(false)} >
                            No<FaThumbsDown className='text-xl'/>
                        </button></div>

                        <div className='digyes'>
                            <button className='diginnerbut' onClick={() => completesummary()} >
                            Yes<FaThumbsUp  className='text-xl'/>
                        </button></div>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

        </div>

    );
      

}

export default Summary;