function SimpleApp(service) {
    this.service = service

    this.echo = (nickname) => {
        var n = 'xxx'
        var firstname = this.service(nickname)
        return `Hello ${firstname}!`
    }
}

function BuuAuthen(authService) {
    this.authService = authService

    this.signIn = (username, password) => {
        var obj = this.authService(username, password)
        return {
            name: obj.name,
            token: '0000000000'
        }
    }
}

test('Simple Mock', () => {
    const mockFn = jest.fn()
        .mockReturnValue('Weera')

    var app = new SimpleApp(mockFn)
    var nickname = 'Ball'
    var result = app.echo(nickname)

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith(nickname)
    expect(result).toBe('Hello Weera!')
})

test('Sign-in with Facebook', () => {
    const facebookAuthMock = jest.fn()
        .mockReturnValue({
            name: 'Bao Hancock',
            facebookId: 'Hahaha',
            email: '58660129@buu.ac.th'
        })

    var auth = new BuuAuthen(facebookAuthMock)

    var username = '58660129@buu.ac.th'
    var password = '123456789'
    var accountInfo = auth.signIn(username, password)

    expect(facebookAuthMock).toHaveBeenCalled()
    expect(facebookAuthMock).toHaveBeenCalledWith(username, password)
    expect(accountInfo.name).toBe('Bao Hancock')
    expect(accountInfo).toHaveProperty('token')
    expect(accountInfo.token).toHaveLength(10)
})
