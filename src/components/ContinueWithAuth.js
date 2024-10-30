"use client";
import { faGithub, faGitlab, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@material-tailwind/react'
import React from 'react'

const ContinueWithAuth = () => {
    return (
        <div>
            <fieldset className="my-6 border-t border-gray-300 text-center">
                <legend className="px-2 text-gray-500">Continue with</legend>
            </fieldset>
            <div className="flex justify-center gap-x-2 mt-4">
                <IconButton
                    color="lightBlue"
                    onClick={() => {/* Google sign-in logic */ }}
                >
                    <FontAwesomeIcon icon={faGoogle} className="text-lg" /> {/* Increase font size */}
                </IconButton>

                <IconButton
                    color="lightBlue"
                    onClick={() => {/* GitLab sign-in logic */ }}
                >
                    <FontAwesomeIcon icon={faGitlab} className="text-lg" /> {/* Increase font size */}
                </IconButton>

                <IconButton
                    color="lightBlue"
                    onClick={() => {/* GitHub sign-in logic */ }}
                >
                    <FontAwesomeIcon icon={faGithub} className="text-lg" /> {/* Increase font size */}
                </IconButton>
            </div>
        </div>
    )
}

export default ContinueWithAuth