// import logo from '../pictures/logo.png'
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDataContext } from '../hooks/useDataContext';

const MainForm = () => {

    const { dispatch } = useDataContext()
    const { user } = useAuthContext()

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [strings, setStrings]=useState('');
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // const{login, error, isLoading} = useLogin()

    document.body.style = 'background: white';
    // function validateForm() {

    //       return password.length > 0;   
    //   }

    // const handleSubmit = async (e) => {

    //     e.preventDefault();   
    //     await login( username, password);
    //     console.log(password, username );
    //   };

    const formatStartdate = (date) => {
        const [year, month, day] = date.split('-');
        let Startdate=0;
        if (year && month && day) {
            Startdate= `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
            return Startdate;
        }
        // if(Startdate!==0){

        // const startDateFormatted = new Date(Startdate).toLocaleDateString();
        // return <span>{startDateFormatted}</span>;
        // }

        return date; // Return the original date if the format is invalid
    };

    const formatEnddate = (date) => {
        const [year, month, day] = date.split('-');
        let Enddate;
        if (year && month && day) {
            Enddate= `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
            return Enddate;
        }
        // if(Enddate){

        // const endDateFormatted = new Date(Enddate).toLocaleDateString();
        // return <span>{endDateFormatted}</span>;
        // }

        return date; // Return the original date if the format is invalid
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
          }

        const data = { endDate, strings, startDate}

        const response = await fetch ('/api/data/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
        }

        if(response.ok)
        {
            setStartDate('')
            setEndDate('')
            setStrings('')
            setError(null)
            setEmptyFields([])
            localStorage.setItem('data', JSON.stringify(json))
            dispatch({type: 'CREATE_DATA', payload: json})
        }
    }

    return ( 
        <div className="mainform">
            {/* <img src={logo} width={70} height={50}/> */}
            <h2>Theek hu</h2>
            {/* <span role="img" aria-label="rocket">🚀</span> */}
            <form onSubmit = {handleSubmit}>
                <label>Start-Date: </label>
                <input type="text" required 
                value={startDate}
                onChange={(e) => setStartDate(formatStartdate(e.target.value))}
                className={emptyFields.includes('startDate') ? 'error' : ''}
                />

                <label>End-Date: </label>
                <input type="text" required 
                value={endDate}
                onChange={(e) => setEndDate(formatEnddate(e.target.value))}
                className={emptyFields.includes('endDate') ? 'error' : ''}
                />

                <pre>
                    <label>Stock Market Tickers:</label>
                    <input type="text" required placeholder="Enter comma separated tickers"
                    value={strings}
                    onChange={(e) => setStrings((e.target.value))}
                    className={emptyFields.includes('strings') ? 'error' : ''}
                    />
                </pre>

                
                <button>Submit</button>
              
                {/* <button disabled={isLoading}>Submit</button>
                {error && <div className="error">{error}</div>} */}
                {error && <div className="error">{error}</div>}
                <pre></pre>
                {/* <a href = "/signup">Don't have an account?</a> */}
            </form>
        </div>
     );
}
 
export default MainForm;