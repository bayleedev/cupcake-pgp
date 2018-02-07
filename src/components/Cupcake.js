import '../assets/css/Cupcake.css'
import React from 'react'
import PropTypes from 'prop-types'

class Cupcake extends React.Component {
  static propTypes = {
    input: PropTypes.string.isRequired,
  }

  render () {
    const input = parseInt(this.props.input.replace(/[^a-z0-9]/ig, ''), 36)
    const layers = [
      { name: 'top', items: 10, seed: 1 },
      { name: 'bottom', items: 10, seed: 2 },
      { name: 'eyes', items: 4, seed: 3 },
      { name: 'mouth', items: 3, seed: 4 },
    ]
    return (
      <div className="cupcake">
        { layers.map(({ name, items, seed }) => {
          const out = (input + seed) % items
          return <div key={name} className={'cupcake-part ' + name + '-' + out}></div>
        }) }
      </div>
    )
  }
}

export default Cupcake
