import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Followers = () => {
    const {auth} = useSelector(state => state)
    return (
        <>
        <h3>Followers</h3>
            {
               auth.user.followers.map(user=>
                <div key={user._id} className="list-group-item d-flex align-items-center">
                                        <img src={user.avatar} alt="" width="50px" className="rounded-sm ml-n2" />
                                        <div className="flex-fill pl-3 pr-3">
                                            <div><Link to={`profile/${user._id}`} className="text-dark font-weight-600">{user.fullname}</Link></div>
                                            <div className="text-muted fs-13px"></div>
                                        </div>
                                        <Link to="#" className="btn btn-outline-primary">remove</Link>
                    </div>
               )
            }
        </>
    )
}

export default Followers
