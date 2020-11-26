const UserPanel = function({currentUser, users}) {
   return (
        <ul className="users">
            {
                users.map(
                    (user, index) => 
                        <li key={user + index}>
                            <div className={currentUser === user  ? "user self" : "user"}>
                                <span className="sendername">{currentUser === user?user+"(You)":user}</span>
                            </div>
                        </li>
                )
            }
        </ul>
   );
};

export default UserPanel;
