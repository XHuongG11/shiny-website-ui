import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';

PaymentMethod.propTypes = {

};

function PaymentMethod() {
    const [paymentOption, setPaymentOption] = useState('MOMO');
    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
    }
    return (
        <div className="payment-method">
            <FormControl >
                <FormLabel sx={{ fontSize: '18.5px', fontWeight: 'bold', color: (theme) => theme.palette.primary.main, }}
                    id='delivery-option-label'>Phương thức thanh toán</FormLabel>
                <RadioGroup
                    aria-labelledby='delivery-option-label'
                    name='delivery-radio-group'
                    value={paymentOption}
                    onChange={handlePaymentOptionChange}
                    sx={{
                        display: 'flex', flexDirection: 'column',
                        borderRadius: '5px', border: '1px solid black',
                    }}
                >
                    <FormControlLabel className={`form-control-label payment ${paymentOption === 'VNPAY' ? 'active' : ''}`}
                        sx={{ margin: '0px', borderRadius: '5px 5px 0 0' }}
                        control={<Radio sx={{
                            color: '',
                            '&.Mui-checked': {
                                color: '#f5918a',
                            },
                        }} />}
                        value='VNPAY' label={
                            <div>
                                <img src="data:image/png;base64,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" alt="VNPAY" className="payment-icon" />
                                <span>Thanh toán online qua cổng VNPAY</span>
                            </div>
                        } />

                    <FormControlLabel className={`form-control-label payment ${paymentOption === 'MOMO' ? 'active' : ''}`}
                        sx={{ margin: '0px' }}
                        control={<Radio sx={{
                            color: '',
                            '&.Mui-checked': {
                                color: '#f5918a',
                            },
                        }} />}
                        value='MOMO' label={
                            <div>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEWtAGz///+qAGasAGmoAGW+aJrTqcHIirCoAGHLirGsAW38/////v+8U43o09+uAGqkAF+lAFysAGOjAGCnAGanAGyuAGb26fP47/ehAF789vrw5+79//viwdXPkbXr2ujHgKquN36rIXbXssqoAFvDcJ+1RYfPl7m/Y5nlzNisHHHUp8S/Zpjdu9KtLnjz4e29cp2xP3/VnsC3TYnozeHLhbG6V4y1PYHt2erQobniv9O0S4yoG23Nmr2yLXa+Uo18QmE5AAAL6UlEQVR4nO2dCVfiOhTHm6ZqaIppaVlkLSC7AiOMODrL9/9Wr6ngg+YGqDYMvJffOXPeeYak+TfbzXJTw9BoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDQazf8EZjCMS4QQy7QwEwKNOMy3AiHsULKYmSWTcEqmyQzbzi7PqcCm3xk2rxujUWMyGI5dE++EjYfNCQ+7HjxMd8IOUSoE0yjdx+Vo9Hh9M5y6vpl95g8SvWeS75bRFrMf33xm28yOSpasfsy2w8rXeSsqiyMSxqQYNirbcVHlsVckKd5QJjDs52qI7mQk+t9W7y7Kie33WkignPNLByVi72GZTJYn7CzzXrqq/jUY9sKqIMFxuI4h8Z950TrI2Q2uo2pI9rVIbFgkLMeCBIU85bmLUzboz4M7L0IuPnLz+CgLQuhlWpLnkbn5mjxqJHO2sE6i0DbIlSPPiLP+J+HKlWSS4eARUemLe6frG6fQ6DUP5GMPDmpKJFr9yuHoqPztBN0qGQAt5ViiiAMPSJS5IUV0T9lvotO5r1gfLoWfL0GOQ0NLTNZ/Ojp6k6hVWFp8oQQ5UeSFUNPcydHRHTRQKpEFx7SWA1SC3abIyK8UsevoRqFERiaHG8tB6MTdSdUK08SuI3oF1POMwJ0vy4uZbr8141uU6zQ4zpSpMuKsRjYKG1uFgK1qyoYdjf2yUfWLMGOcjUCExh9lwEg3beSonTypaYp24SYbfZQ2N90pw4tP9M0UtZVUU9sDpgzvT5Q0JFneaWszbmO/tc/Ik9pxIyX1lBXBvFRrNVk+qFOrga3MKa4ziB8kMaNBpTwrV6UvaaFCoZmHHtUsel5xAhWEgybjO7fYpI6Yzfx7LWMuUC14Usv51HddN5iGL3BVGKmw3kriuOWgh3hmeh+K4yRF4X0UhAtDQP73uCHa5grIfh0t+17p/Zms4PWjqZrwIwd1FLTEAmB6PBbifGCoiba897mOB8wYB+9dTaELVfDQtT/qIMPM+w6V4kTBLMMErMf5+jnBQAz7tS6HUk8Mu47fjOGLSwV1Z1FIPJgMgXl/WcF02LoWc/qwXnoJckBRrOsRHsoUms9iCH0Wl3MsIAW0yr6aQgqv1mVoAgpv1mH4ClAYD9lEqBUUtqsJMLtqZm+dKlCYbL20/nIPVj5LXMIZZW/XZKowrqWBOFgO4bpn9oQOueqCvzwbhTwMt4W/16A1Dg4RJ6adzLuazMsQ6IJ+BLKHiwb6IvOuJnOFpmhCPMtyDQw5V5mPiJkrtJpC4+rIHs6mQhq5C1AojAHVoqxtsZ9CGoPLVCh7OBNn3+evkFmDpDXmyMtQXCJqnr1CHik5HrZlCvFCSCO8AIVzoaeZy3INPEBiHJyTQqBcXmXGJrlN/NJRYHpnb7WNhTJ0AgbX0444Cc7+/EL2Ct1ysqdBv+BCJBNB4Uxm4J2TwsJIDPkJPRqwYFE3OVE+R4XAyg9f+xBxZ+I6Rq90AQqBQY6iR3EplIgHNKh86DwnhUZBWMCKlLz6u50kDpZiAmh0n7nA7OeH8fJOojd1Io21NmE2w4Zt24bNyFsZWmuTjpznonC9BGE54Dp6Y+WZpRIzS4W7BbzfVcm+J1VShoYJpBlrLl+Hw8Xwhh8sAwqQokH2/YySdgiN5MdQdywV5xVVlKENrRPGOMBuxwaKctkPhlkr/FgK/NTZh5maHVI1CkvQevYh3lS0QlUKDXKdcheYoqc0B3L/ukJmey+pBCK09Gw1JxWU9KWcn5UUpUhpTbamer4Ki1Nxk02usNLZc0j1jBRud4YsWDkINm4Efag6VnfEVJnCaMj4feyYUftpXojChN2Mg9u9p042LEsqz3ora4cx97+O6G2a90oPsytVyHChPRN/9wGfVbWmxFDqd6G2DKM0uI+DvCBrPUu1W4nKdvj+Q9OPHS64C8nmh1wxt8FnoYWVuz8pVxhRunvrVndPCFFKy92+q2yYP1ZhM53CrnQNgplk0WyUNzZAtdzI9UnhNN4yrJ3/k8/H/zY8b3Y02e/1X/78EcKM8fNurIj2vgdhi7jB9Nviz+Lb1PKIIjMbevAW5vq/m6Zhr/9sbv1GjGcKYTIYw2bJxIydxElmw9/yc9RoNJr/Nrx3ZbzzZwbcq+8L25OsHY0WUbqMu8Yc5yCtCBxYd8Xpqt9f/Qx8K7G2wAI/6PCwaTEKSzVoM2z5xU673++3O4F/whF/B9swyTh8na2tq+pLdx6Qj+m36RZ73dYmbPYYjqOwY8rCNjBx27nX2ofVNnvNTV2l814YZvrzZeIUOh0NvVgFJsNGchZ0GwbHnOnFd/2JuKBRvl55Jy5JHOSSy2OUu1XUej5mdz3uqr8t0eFh1VyyIguYQchnwcm3w2dPrfkpb1aw/aF04ai1Wsl8h1BtSPZ1G8yfl2VReUE+uKeqq9jvyqfidcfZ403Y9eV1jbRv98zweaVYTpXsOCVhxUBaSIeZjWXl4AEzTIGcIsfDHXCqNfgEFFV+g6UYn0Y4lGzUHhuB+g6n+EVf5wrUEvF4XwvcZqZcYjD7mrc6390UaprZPnbjwqlXxyolMkz2dDJHEY2h3eQGLuscvTPjRJVgfPgWmM+Dhyn9riGNaLjbJWIjxdYTovWywoqK3UoG/vio4m/VU9vw0/bNy3tlhQitin6G79s3SpHrlG+NooGy/SeSPA/6SSofLktRYQAeegfpq6mnNuRI+Dk+jmgzo1D+RMueKVoBtx4PXQJ0JPR1050y65dk3/D9r/CxoboCf5kYHxrs4yxIWpI07N/rTcaSfnT9LmkdfqfVQEVnw9rgs56uehNJV+FM5ldPoITpWmFBdjNNuZt7GD7cdGUWVPYOMxGmuMPioKVFsEmKwOVfDm0Z0bzVIg2gbvfeGxK2gJkIraNGn29XYGwWvHyD7z4Jv6mq8McH9pdoLX4QY0WxpGi1GK9CMR+wOZtrf/wcVAlnfe/jehZccvPgCdreibzVB+vJEHRDycY6MwFP9sn7koYvHoeK5g+uudPIAn8p3o9Blyq81QGFV+vHlIBrTzb9HeitHisEHNIQehTuD8R3y2R3FQkO/v5J9tzBPWDIG+FFbGA2CwRvBKqimmZ/UoEIZ7gpfN8F6FFy5v4WcRgwwE4IONC54u0pszP3Vo97oY7oKCIZyJl4Hlzub3oeCmPvvDdBYUO2bOwnvfNUmN8qPCyThFJvdXEwPnMPSx4GmBDSMxqX5yXL26ElmAJ73LVEb/Uz93SOFabwx7fHgnV/5t7qhM8N0/jjX5y3eqxQbIdj2cOBMf8Cbo0AIuVl/aMp3vyRvdl2kttbpP744sPfznu04D1NVPOS3UdNYoox0cCjZ34DT2y14eS8uS4ZxhkWK2kl+1l+9pa3cBOWA7tyG8aduE4wuoTZUwmYU99AlikBlgkGZ35fW6wQQzfSLYSNF0YehAZL0eoSbo0wLPBWweTUljw74ipG5US3Cn5NoQ3c4BXlfu5tH9fFd9B+EH1S4JugoAxxH8g8QsvV/Xp3ieH7lTgz5EwVbM6o8CiB9g5pHdHRvGN5rkc6oeQIioI7BdUo3LOdVZu1ZpI1/TpFeRW7T0q8gqBrdmNojGzvdCkedzhXheztExt2qm67VuPZVUh9YzlSdmO5GoXM3+ewBkFROfulUoUKMVukrad0mv1SqUKFkckSSjazYXlqNtaUKjS8HynOB1DUVNKPZq5wpxi8ybHfdokKG/wUzxkq3O0M3QmSHElIwAVeiLd6orv3vh+jLxr/53sPUp+TQuHe9Xz1sEM+rfQLF+utbgTBng+2rekGar2dFXurM2tYln4LhB9VqOV9xae8VfvjG5iE8q/nzUJPucOFcoVRMuRqSRMjR50Plsuhen1RS1GvkH/MZhwud1ZvaKURjglWZKjtgG9atwlam30G3BPDepuwvBB2eyOZ/fAv0JrEbfcG143RLf+E68PUtTBO7eH3KRgjApsH21gexuyCEHbAv6dkBib/XK7JTGUXCkHwZ9m7fIRhIezf9TIxnnHQVY/FUQztI6/RaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDQajUaj0Wg0Gs1l8Q/heOwHM9dTOAAAAABJRU5ErkJggg==" alt="MoMo" className="payment-icon" />
                                <span>Ví MoMo</span>
                            </div>
                        } />

                    <FormControlLabel className={`form-control-label payment ${paymentOption === 'COD' ? 'active' : ''}`}
                        sx={{ margin: '0px', borderRadius: '0 0 5px 5px' }}
                        control={<Radio sx={{
                            color: '',
                            '&.Mui-checked': {
                                color: '#f5918a',
                            },
                        }} />}
                        value='COD' label={
                            <div>
                                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ_LkIaCOXb2cz59wW10uPlS7irUrVmhQPLe4T75Xsx8-Ufx_e6" alt="COD" className="payment-icon" />
                                <span>Thanh toán khi giao hàng (COD)</span>
                            </div>
                        } />


                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default PaymentMethod;