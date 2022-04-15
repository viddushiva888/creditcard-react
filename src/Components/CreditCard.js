import React, { useEffect, useRef, useState } from "react";
import Styles from "./CreditCard.module.css";

const CreditCard = () => {
    const [userInfo, setUserInfo] = useState( {numBox1: "", numBox2: "", numBox3: "", numBox4: "", id: ""} );
    // const [numBox2, setNumBox2] = useState("");
    // const [numBox3, setNumBox3] = useState("");
    // const [numBox4, setNumBox4] = useState("");

    const [display, setDisplay] = useState([]);
    const numRef1 = useRef();
    const numRef2 = useRef();
    const numRef3 = useRef();
    const numRef4 = useRef();
    // var displayNum;

    const handleChange = (event) => {
        // setNumBox1(event.target.value);
        // const { value, maxLength } = event.target;
        
        // [event.target.name] = event.target.value.slice(0, maxLength);

        console.log(event.target.value)

        var tempValue = event.target.value;

        // if (tempValue.length >= 0 && tempValue.length <= 4) {
        //     setUserInfo( { ...userInfo, numBox1 : tempValue.slice(0, event.target.maxLength) } )
        // }

        // if (tempValue.length > 4 && tempValue.length <= 8) {
        //     setUserInfo( { ...userInfo, numBox1 : tempValue.slice(0, 4), numBox2 : tempValue.slice(4, tempValue.length) } )
        //     numRef4.current.focus()
        // }

        // if (tempValue.length > 8 && tempValue.length <= 12) {
        //     setUserInfo( { ...userInfo, numBox1 : tempValue.slice(0, 4), numBox2 : tempValue.slice(4, 8), numBox3 : tempValue.slice(8, tempValue.length) } )
        //     numRef4.current.focus()
        // }

        if (tempValue.length > 12 && tempValue.length <= 16) {
            setUserInfo( { ...userInfo, numBox1 : tempValue.slice(0, 4), numBox2 : tempValue.slice(4, 8), numBox3 : tempValue.slice(8, 12), numBox4 : tempValue.slice(12, tempValue.length), id : new Date().getTime().toString() } )
            numRef4.current.focus();
        }
        else {
            setUserInfo( { ...userInfo, [event.target.name] : event.target.value.slice(0, event.target.maxLength), id : new Date().getTime().toString() } )
        }
        

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const {numBox1, numBox2, numBox3, numBox4, id} = userInfo;

        if(numBox1 === "" || numBox2 === "" || numBox3 === "" || numBox4 === "") {
            alert("Please fill in the details!")
            return;
        }

        // var displayNum;
        // console.log(displayNum);
        // const info = userInfo[userInfo.length - 1];
        const tempObj = {
            numBox1: userInfo.numBox1,
            numBox2: userInfo.numBox2,
            numBox3: userInfo.numBox3,
            numBox4: userInfo.numBox4,
            id: id
        }
        const tempArr = display;
        tempArr.push(tempObj);

        setDisplay([...tempArr]);
        console.log(display);
        setUserInfo({numBox1: "", numBox2: "", numBox3: "", numBox4: ""});
    }

    const handleDelete = (event) => {
        setDisplay(display.filter( (user) => user.id !== event.target.value))
        console.log(event.target.value)
    }

    useEffect( () => {
        if (numRef1.current.value.length < 4) {
            numRef1.current.focus()
        }
        if (numRef1.current.value.length === 4) {
            numRef2.current.focus()
        }
        if (numRef1.current.value.length === 4 && numRef2.current.value.length < 4) {
            numRef2.current.focus()
        }
        if (numRef1.current.value.length === 4 && numRef2.current.value.length === 4) {
            numRef3.current.focus()
        }
        if (numRef1.current.value.length === 4 && numRef2.current.value.length === 4 && numRef3.current.value.length < 4) {
            numRef3.current.focus()
        }
        if (numRef1.current.value.length === 4 && numRef2.current.value.length === 4 && numRef3.current.value.length === 4) {
            numRef4.current.focus()
        }
        if (numRef1.current.value.length === 4 && numRef2.current.value.length === 4 && numRef3.current.value.length === 4 && numRef4.current.value.length < 4) {
            numRef4.current.focus()
        }
        if (numRef1.current.value.length === 4 && numRef2.current.value.length === 4 && numRef3.current.value.length === 4 && numRef4.current.value.length === 4) {
            numRef4.current.focus()
        }
        // numRef1.current.focus();


        numRef4.current.addEventListener("keydown", (event) => {
            if (numRef4.current.value.length === 0 && event.key === "Backspace") {
                numRef3.current.focus()
                // console.log("Backspace");
            }
        })

        numRef3.current.addEventListener("keydown", (event) => {
            if (numRef3.current.value.length === 0 && event.key === "Backspace") {
                numRef2.current.focus()
                // console.log("Backspace");
            }
        })

        numRef2.current.addEventListener("keydown", (event) => {
            if (numRef2.current.value.length === 0 && event.key === "Backspace") {
                numRef1.current.focus()
                // console.log("Backspace");
            }
        })

        numRef1.current.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.key === ("v" || "V")) {

                console.log(event)
                // numRef4.current.focus();
            }
        })
    })

    return(
        <div>
        
            <div className={Styles.formContainer}>
                <form className={Styles.formBox} onSubmit={handleSubmit}>
                    <div className={Styles.formBox1}>
                        <div><label className={Styles.formBoxText}>Credit Card Number*</label></div>
                        <div><input className={Styles.formBoxNum} type="number" ref={numRef1} value={userInfo.numBox1} onChange={handleChange} name="numBox1" maxLength={4} /></div>
                        <div><input className={Styles.formBoxNum} type="number" ref={numRef2} value={userInfo.numBox2} onChange={handleChange} name="numBox2" maxLength={4} /></div>
                        <div><input className={Styles.formBoxNum} type="number" ref={numRef3} value={userInfo.numBox3} onChange={handleChange} name="numBox3" maxLength={4} /></div>
                        <div><input className={Styles.formBoxNum} type="number" ref={numRef4} value={userInfo.numBox4} onChange={handleChange} name="numBox4" maxLength={4} /></div>
                    </div>
                    <div className={Styles.formBox2}>
                        <button className={Styles.formBoxBtn} onClick={handleSubmit} type="submit">Submit</button>
                    </div>
                </form>
            </div>

            {display.map( (user) => 
            <div className={Styles.cardContainer} key={user.id}>
                <div className={Styles.cardContainerTop}>
                    <div className={Styles.cardContainerTop1}>Your Credit Card Number is:</div>
                    <div className={Styles.cardContainerTop2}>{user.numBox1} {user.numBox2} {user.numBox3} {user.numBox4}</div>
                </div>
                <div className={Styles.cardContainerBottom}>
                    <button className={Styles.cardDeleteBtn} value={user.id} onClick={handleDelete}>Delete</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default CreditCard;