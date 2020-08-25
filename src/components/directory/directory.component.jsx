import React from 'react';
import MenuItem from '../menu-item/menu-item.component'
import {DirectoryContainer} from './directory.styles'
import {selectDirectorySections} from '../../redux/directory/directory.selector'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'


const Directory = ({sections}) =>(
            <DirectoryContainer>
                {
                    sections.map(({id, ...otherSectionProps})=>(
                        <MenuItem key ={id} {...otherSectionProps}/>
                    ))
                }
            </DirectoryContainer>
)

const mapStateToProps=createStructuredSelector({
  sections:selectDirectorySections
})

export default connect(mapStateToProps)(Directory)