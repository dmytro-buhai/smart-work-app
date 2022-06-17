import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import OfficeForm from "../forms/OfficeForm";
import { Company } from "../models/company";

import { useStore } from "../stores/store";

interface Props {
    company: Company
}

export default function CompanyListItem({company}: Props){
    const {companyStore, modalStore, userStore: {checkHostName}} = useStore();
    const {deleteCompany, loading} = companyStore;

    const[target, setTarget] = useState(0);

    function handleCompanyDelete(e: SyntheticEvent<HTMLButtonElement>, id: number){
        setTarget(+e.currentTarget.name);
        deleteCompany(id);
    }
    
    return (  
        <Segment.Group >
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="medium" bordered src={`/assets/${company.photoFileName}.jpg`}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/companies/${company.id}`} >
                                {company.name}
                            </Item.Header>
                            <Item.Description>
                                <Icon name="phone volume" /> {company.phoneNumber}
                                <br/>
                                <Icon name="address card outline" /> {company.address}   
                                <br/>
                                <br/>  
                                Dscription: <br/> {company.description}               
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            {checkHostName(company.host) &&  
                <Segment clearing>
                    <Button 
                        onClick={() => modalStore.openModal(<OfficeForm companyId={company.id}/>)}
                        positive
                        content='Add office'
                    />
                    <span>
                        <Button as={Link} to={`/companies/${company.id}`}  floated='right' content='View' color='blue' />
                        <Button
                            name={company.id}
                            loading={loading && target === company.id}
                            onClick={(e) => handleCompanyDelete(e, company.id)} 
                            floated='right' 
                            content='Delete' 
                            color='red' 
                        />
                    </span>
                </Segment>
            }
        </Segment.Group> 
    )
}