import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../../Context'

const Login: FC = () => {
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    //nav
    const nav = useNavigate()

    //context
    const { setStudentName, login, studentMail } = useChat()

    // Chech if user is already logged in
    useEffect(() => {
        if (studentMail) {
            alert('You are already logged in.')
            setMessage('You are already logged in.')
            setTimeout(() => {
                nav('/dashboard')
            }, 1000) // Redirect after 3 seconds
        }
    }, [studentMail, nav])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            if (data.message === 'Success') {
                setStudentName(data.StudentName)
                login(data.userEmail, data.StudentName)
                nav('/dashboard')
            }
        } else {
            const errorData = await response.json()
            console.log(errorData) //
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-24 w-auto"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7H4zcd-uwZONKwVlAurlkhYu_9Bve22BRzw&s"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Prijavi se na svoj nalog
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? 'Logging in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Nemas account?{' '}
                    <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Prijavi se prvo u studensku sluzbu
                    </a>
                </p>

                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login
