
interface Props {
    offices: any[];
}

function OfficesList(props: Props){
    return(
        <>
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-4">SwartWork - find your place to work</h1>
                <p className="lead">
                    Just check out the offices we have and let's subscribe to a place to work :)
                </p>
            </div>
            <div className="container">
                <div className="row text-center">
                    {props.offices.map((office : any) =>(
                        <div className="col-md-4">
                            <div className="card mb-4 box-shadow">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">{office.id} {office.name}</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">${office.id} 
                                        <small className="text-muted">/ item</small>
                                    </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                    <li>{ office.description }</li>
                                    </ul>
                                
                                    <button type="button" className="btn btn-lg btn-block btn-primary">
                                        <a className="text-decoration-none text-reset" href="#">View</a>
                                    </button>
                                </div>
                            </div>
                        </div> 
                    ))}
                </div>
            </div>
        </>
    )
}

export default OfficesList;