import axios from 'axios'
import React, { useState } from 'react'
import { Button } from '../../components/common/Buttons'

const ProjectPage = () => {
    const [project, setproject] = useState("")
    const createProject = () => {
        axios.post(`http://localhost:5000/api/createProject`, { project }).then((data) => console.log(data)).catch(err => console.error(err))
    }

    return (
        <div>ProjectPage
            <input type="text" onChange={(e) => {
                setproject(e.target.value)
            }} placeholder='Le nom de votre projet' />
            <Button onClick={createProject}>Confirmer</Button>
        </div>
    )
}

export default ProjectPage