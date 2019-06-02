import React from 'react';
import StackGrid from "react-stack-grid";
import sizeMe from 'react-sizeme';

import tennis from '../../static/assets/tennis.jpg';
import soccer from '../../static/assets/soccer.jpg';
import basketball from '../../static/assets/basketball.jpg';
import baseball from '../../static/assets/baseball.jpg';

import Interest from './Interest';

class InterestTab extends React.Component {

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
        <Interest title="Soccer" interest_id={2} img={ soccer }/>
        <Interest title="Basketball" interest_id={3} img={ basketball }/>
	    <Interest title="Baseball" interest_id={4} img={ baseball }/>
      </StackGrid>
    );
  }
}

export default sizeMe()(InterestTab);
