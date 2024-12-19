import {ChangeEvent, useState} from 'react';
import './CharacterList.scss'
import Pagination from "../Pagination/Pagination";
import {gql, useQuery} from "@apollo/client";
import CharacterListItem, {CharacterListItemModel} from "./CharacterListItem/CharacterListItem.tsx";
import {Link} from "react-router-dom";

export const GET_CHARACTERS = gql`
query Characters($name: String,$page: Int){
    characters (page:$page, filter: {name: $name}){
      info {
      count
    }
      results {
        id
        name
        species
        image
      },
    },
  }
`;

interface CharactersResponseModel {
    characters: {
        info: { count: number },
        results: CharacterListItemModel[]
    }
}


const CharacterList = () => {
    const [nameInputValue, setNameInputValue] = useState('')
    const [filter, setFilter] = useState({name: ''});
    const [activePage, setActivePage] = useState(0)
    const {loading, error, data} = useQuery<CharactersResponseModel>(GET_CHARACTERS, {
        variables: {
            page: activePage,
            name: filter.name
        }
    })
    const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameInputValue(event.target.value);
    };

    const handleFilterFormSubmit = () => setFilter({name: nameInputValue});
    if (loading) return <div className="character__loading">Loading...</div>;
    if (error) return <div className="character__error">Error: {error.message}</div>;
    if (!data) return <div className="character__not-found">Characters not found</div>;
    const {characters} = data;
    return (
        <div className='character-list__wraper'>
            <form className='character-list-filter-form' onSubmit={handleFilterFormSubmit}>
                <input value={nameInputValue} onChange={handleNameInputChange} type="text" name='name'/>
            </form>
            <ul className='character-list'>
                {characters.results.map((item, index) => <Link to={`/character/${item.id}`}><CharacterListItem
                    key={index} {...item}/></Link>)}
            </ul>
            <Pagination initialPage={activePage} totalItems={characters.info.count ?? 0}
                        onPageChange={setActivePage}/>
        </div>
    );
};

export default CharacterList;