import {gql, useQuery} from "@apollo/client";
import {useNavigate, useParams} from "react-router-dom";
import 'Character.scss'

export const GET_CHARACTER = gql`
query Character($id:ID!){
    character (id:$id){
      
        id
        name
        species
        gender
        image
        episode{
        name
        episode
        }
      
    },
  }
`;

interface CharacterModel {
    name: string,
    status: 'Dead' | 'Alive' | 'unknown',
    species: string,
    gender: string,
    image: string,
    episode: { name: string, episode: string }[],
}

interface CharacterResponseModel {
    character: CharacterModel
}

const Character = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const {loading, error, data} = useQuery<CharacterResponseModel>(GET_CHARACTER, {
        variables: {
            id
        }
    })
    const handleGoBack = () => navigate(-1)
    if (loading) return <div className="character__loading">Loading...</div>;
    if (error) return <div className="character__error">Error: {error.message}</div>;
    if (!data) return <div className="character__not-found">Character not found</div>;

    const {character} = data;

    return (
        <div className="character">
            <button onClick={handleGoBack} className='character__goback-button'></button>
            <div className="character__header">
                <img className="character__image" src={character.image} alt={character.name}/>
                <div className="character__info">
                    <h1 className="character__name">{character.name}</h1>
                    <p className="character__species">{character.species}</p>
                    <p className="character__gender">{character.gender}</p>
                </div>
            </div>

            <div className="character__episodes">
                <h2 className="character__episodes-title">Episodes</h2>
                <ul className="character__episodes-list">
                    {character.episode.map((ep, index) => (
                        <li key={index} className="character__episode">
                            <span className="character__episode-code">{ep.episode}</span>
                            <span className="character__episode-name">{ep.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Character;