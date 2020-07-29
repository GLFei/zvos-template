const path = require('path')
const process = require('process')
const fse = require('fs-extra')
const spawn = require('cross-spawn')
const client = require('ssh2-sftp-client')
const chalk = require('chalk')

const SFTP_CONFIG = {
    host: 'hostname',
    port: '',
    username: 'username',
    password: 'password'
}

const PATH_CONFIG = {
    from: '/dist',
    to: '/home/sysadmin/am-web'
}

class Task {
    constructor() {
        this.root = process.cwd()
        this.sftp = new client()
        this.from = path.join(this.root, PATH_CONFIG.from)
    }

    async run() {
        console.log(chalk.green('部署开始，编译中...'))
        this.pre()
        await this.go()
        this.after()
        this.end()
    }

    pre() {}

    async go() {
        try {
            spawn.sync('npm', ['run', 'build'], { cwd: this.root, stdio: 'inherit' })

            if (fse.pathExistsSync(this.from)) {
                await this.sftp.connect(SFTP_CONFIG)
                let stat = await this.sftp.exists(PATH_CONFIG.to)
                if (stat === 'd') {
                    await this.sftp.rmdir(PATH_CONFIG.to, true)
                }
                console.log(chalk.green('上传中...'))
                await this.sftp.uploadDir(this.from, PATH_CONFIG.to)
                await this.sftp.end()
            }
        } catch (e) {
            console.log(chalk.red('部署出错：'), e)
        }
    }

    after() {}

    end() {
        console.log(chalk.green('部署完成'))
    }

}

new Task().run().then()