import './CharacterListItem.scss';

export interface CharacterListItemModel {
    id: number;
    name: string,
    image: string,
    species: string
}

const CharacterListItem = ({name, image, species}: CharacterListItemModel) => {
    return (
        <div className='character-list-item'>
            <img className='character-list-item__image' src={image} alt='character'/>
            <div className='character-list-item__content'>
                <div className='character-list-item__name'>{name}</div>
                <span className='character-list-item__species'>{species}</span>
            </div>
        </div>
    );
};

export default CharacterListItem;