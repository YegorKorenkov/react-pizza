import React from 'react';

function Categories({ items, onClick }) {

  const [activeItem, setActiveItem] = React.useState(null)

  return (
      <div className="categories">
            <ul>
              <li 
                onClick={() => setActiveItem(null)} 
                className={activeItem === null ? "active" : ""}
              >Все</li>
              {items && items.map((name, id) => (
              <li 
                className={activeItem === id ? "active" : ""}
                onClick={() => setActiveItem(id)} 
                key={`${name}_${id}`}>
                {name}
                </li>
                )
              )}
              
            </ul>
          </div>
  );
}

// class Categories extends React.Component {
  
//   state = {
//     activeItem: null
//   }

//   render() {
//     const { items, onClick } = this.props;
//     return (
//       <div className="categories">
//             <ul>
//               <li className="active">Все</li>
//               {items.map((name, id) => (
//               <li
//                 className={this.state.activeItem === id ? "active" : ""}
//                 onClick={() => this.setState({activeItem: id})} 
//                 key={`${name}_${id}`}>
//                 {name}
//               </li>)
//               )}
              
//             </ul>
//           </div>
//   );
//   }
// }

export default Categories;

