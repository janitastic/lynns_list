import * as React from 'react';
import './MyLists.scss';
import { UserLists } from '../../types';
import ListCard from '../RestaurantCards/ListCard';
import { Link } from 'react-router-dom';

interface Props {
  userLists: UserLists;
  removeFromList: (listName: string, id: string) => void;
  selectedList: string;
  createNewList: (newListName: string) => void;
}

interface State {
  cardsToDisplay: JSX.Element[], 
  selectedList: string,
  input: boolean,
  value: string
}

class MyLists extends React.Component<Props, State> {
  state: State = {
    cardsToDisplay: [],
    selectedList: this.props.selectedList,
    input: false,
    value: ''
  }

  componentDidMount = () => {
    this.createCardsToDisplay();
  }
 
  componentDidUpdate = () => {
    if (this.state.cardsToDisplay.length !== this.props.userLists[this.state.selectedList].length) {
      this.createCardsToDisplay();
    }
  }

  createCardsToDisplay = () => {
    const cards = this.props.userLists[this.state.selectedList].map(restaurant => {
      return (
        <ListCard 
          key={restaurant.id}
          id={restaurant.id}
          removeFromList={this.props.removeFromList}
          name={restaurant.name}
          rating={restaurant.rating}
          image={restaurant.image_url}
          location={restaurant.location.display_address}
          phone={restaurant.display_phone}
          url={restaurant.url}
          selectedList={this.state.selectedList}
        />
      )
    })
    this.setState({ cardsToDisplay: cards })
  }

  updateList = (listName: string) => {
    this.setState({ selectedList: listName }, this.createCardsToDisplay)
  }

  showNewListInput = (): void => {
    this.setState(prevState => ({
      input: !prevState.input
    }))
  }

  getInput = (): void => {
    if (this.state.value) {
      this.props.createNewList(this.state.value)
      this.clearInput()
    }
  }

  clearInput = (): void => {
    this.setState({value: '', input: false})
  }

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const inputField = this.state.input &&
      <div>
        <input className='list-input' type='text' value={this.state.value} onChange={event => this.handleChange(event)}></input>
        <button onClick={() => this.getInput()}>Create List</button>
      </div>

    return (
      <div className='my-lists-page'>
      <section className='list-menu-container'>
        <section className='my-lists-button-container'>
          <p className='instructions'>
            Select a list to view.
          </p>
          <article className='buttons'>
            {/* <Link to='lovedIt' className='btn-link'><button className='list-nav-btn' onClick={() => this.updateList('lovedIt')}>Loved It</button></Link>
            <Link to='gottaGo' className='btn-link'><button className='list-nav-btn' onClick={() => this.updateList('gottaGo')}>Gotta Go</button></Link> */}
          </article>
        <button className='new-list-button' onClick={() => this.showNewListInput()}>
          <div className='plus'>
            <p>+</p>
          </div>
          <div className='new-list-text'>Add New List</div>
        </button>
         {inputField}
        </section>
      </section>
      <section className='my-lists-container'>
        <section className='list-view'>
          { this.state.cardsToDisplay }
        </section>
      </section>
    </div>
    )
  }
}

export default MyLists;