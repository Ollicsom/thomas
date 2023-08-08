
app.post('/api/login/', async(req, res) => {
    try{
        let username = req.body.user.username;
        let password = req.body.user.password;

        const user = await User.findOne({
            where: {
                username,
            }
        })
        if (user && bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            { username, password },
            process.env.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(201).json(token);
        } else {
            return res.status(401).json({message: 'Wrong association of username and password'})
        }
    } catch(err) {
        return res.status(500).json(err)
    }
})