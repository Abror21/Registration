import { useNavigate } from "react-router-dom";


const ContactList = ({ title, email, addobj, techlist, removetech }) => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>{title}</h1>
            <h2>Email : {email}</h2>
            <h3>{addobj.address1}</h3>
            <h3>{addobj.address2}</h3>

            <div style={{ textAlign: 'center' }}>
                <h3>Technology List</h3>
                {
                    techlist.map((item) => (
                        <div key={item.id} style={{ border: '1px solid black', margin: '30px' }}>
                            <h3>Tech ID is {item.id}</h3>
                            <h3>Tech Name is {item.name}</h3>
                            <h3>Tech Version is {item.version}</h3>
                            <button onClick={() => removetech(item.id)} className="btn btn-danger">Remove</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ContactList;