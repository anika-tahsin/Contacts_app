import React from "react";

const ContactList = ( {contacts}) => {
    return <div>
        <h2> Contacts </h2>
        <table>
            <head>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </head>
            <tbody></tbody>
        </table>
    </div>
}