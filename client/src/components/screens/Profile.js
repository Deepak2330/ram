import React, { useEffect, useState } from 'react'
import PostDetail from './PostDetail'
import ProfilePic from './ProfilePic'
import "../styles/Profile.css"
let base_uri = process.env.REACT_APP_BASE_URL

export default function Profile() {

    var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
    const [show, setShow] = useState(false)
    const [posts, setPosts] = useState([])
    const [pic, setPic] = useState([])
    const [user, setUser] = useState("")
    const [changePic, setChangePic] = useState(false)

    
    const toggleDetails =(posts)=>{
        if(show){
            setShow(false)
        }else{
            setShow(true)
            setPosts(posts)
        }
    }

    const changeProfile =()=>{
        if(changePic){
            setChangePic(false)
        }else{
            setChangePic(true)
        }
    }
    
    
    useEffect(()=>{
        fetch(`${base_uri}/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then((result)=>{
            setPic(result.post)
            setUser(result.user)
        })
    },[])

  return (
    <div className="profile">
        {/* profile frame */}
        <div className="profile-frame">
            <div className="profile-pic">
                <img onClick={()=> {changeProfile()}} src={user.Photo ? user.Photo : picLink } alt="" />
            </div>

            {/* profile data */}
            <div className="profile-data">
                <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                <div className="profile-info" style={{display: "flex"}} >
                    <p>{pic ? pic.length : "0"} post</p>
                    <p>{user.followers ? user.followers.length : "0"} followers</p>
                    <p>{user.following ? user.following.length : "0"} following</p>
                </div>
            </div>
        </div>

        <hr style={{width: "90%", opacity: "0.8", margin: "25px auto"}} />

        {/* Gallery */}
        <div className="gallery">
            {pic.map((pics)=>{
                return (
                    <img className='item' key={pics._id} src={pics.photo}
                    onClick={()=> {toggleDetails(pics)}}
                    />
                )
            })}
        </div>

            {show && 
                <PostDetail item ={posts} user={user} toggleDetails={toggleDetails} />
            }

            {
                changePic && <ProfilePic changeProfile={changeProfile} />
            }

    </div>
  )
}