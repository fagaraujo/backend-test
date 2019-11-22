/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

export class BaseController {
    success(msg: string = '', info: any = {}) {
        return {
            status: 'OK',
            message: msg || '',
            info: info || {}
        }
    }
    error(msg: string, info: any = {}) {
        return {
            status: 'ERROR',
            message: msg || '',
            info: info || {}
        }
    }    
}