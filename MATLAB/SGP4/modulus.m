%-------------------------------------------------------------------
%------------------------------ modulus ----------------------------
%-------------------------------------------------------------------
%%%%%% Opensource function same source as test_sgp4.m
function modu = modulus(arg1, arg2)

modu = arg1 - floor(arg1/arg2) * arg2;

if (modu >= 0)
    return
else
    modu = modu + arg2;
    return
end

