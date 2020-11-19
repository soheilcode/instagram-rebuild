import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Avatar } from '@material-ui/core';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
function Header() {
    const [{user} , dispatch] = useStateValue();
    return (
        
             <div className="header__wrap">
            <div className="header">
              <div className="header__logo">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="instagram-logo"/>
              </div>
                <div className="header__search">
                  <div className="header__searchWrap">
                    <SearchIcon/>
                    <input type="text" placeholder="Search"/>
                  </div>
                </div>
                <div className="header__icons">
                  <HomeIcon />
                  
                  <ExploreIcon />
                  <FavoriteIcon />
                  <div onClick={() => auth.signOut()} style={{cursor : 'pointer'}}>
                    <Avatar src={user?.photoURL}/>
                  </div>
                </div>
            </div>
          </div>
  
    )
}

export default Header
