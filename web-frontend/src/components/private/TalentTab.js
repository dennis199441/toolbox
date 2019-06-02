import React from 'react';
import StackGrid from "react-stack-grid";
import sizeMe from 'react-sizeme';

import tennis from '../../static/assets/tennis.jpg';

import Interest from './Interest';

class TalentTab extends React.Component {

  computeColumnWidth() {
    const { width } = this.props.size
    
    if(width < 532) {
      return "50%";
    } else if(width >= 532 && width < 798) {
      return "33.3%";
    } 
  
    return "25%";
  }

  render() {
    return (
      <StackGrid columnWidth={this.computeColumnWidth()}>
        <Interest title="Tennis" interest_id={1} img={ tennis }/>
      </StackGrid>
    );
  }
}

export default sizeMe()(TalentTab);
