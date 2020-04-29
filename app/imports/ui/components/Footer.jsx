import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { color: 'white', backgroundColor: '#024731', paddingTop: '10px' };
    return (
          <div style={divStyle} className="ui fluid center aligned container" id='footer'>
            <Link to='https://www.facebook.com/uhm.studentlife/?ref=ss'><Icon name='facebook' /></Link>
            <Link to='https://twitter.com/UHM_StudentLife'><Icon name='twitter square'/></Link> <br />
            Information Provided by Student Life & Development <br />
            University of Hawaiʻi at Mānoa · 2465 Campus Road, Room 208 · Honolulu, HI 96822 <br />
            Phone: (808) 956-8178 · Email: sld@hawaii.edu<br />
            Website Managed by CL-UH-B
          </div>
    );
  }
}

export default Footer;
