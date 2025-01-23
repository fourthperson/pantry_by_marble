import IMAGES from '../../assets/images';

export function imageMapper(index: number) {
    switch (index) {
        case 0:
            return IMAGES.ONE;
        case 2:
            return IMAGES.TWO;
        case 3:
            return IMAGES.THREE;
        default:
            return IMAGES.FOUR;
    }
}
