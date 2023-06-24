
td_5d = function(td_R, td_n) {
    try {
        var td_b = [""];
        var td_e = 0;
        for (var td_q = 0; td_q < td_n.length; ++td_q) {
            td_b.push(String.fromCharCode(td_R.charCodeAt(td_e) ^ td_n.charCodeAt(td_q)));
            td_e++;
            if (td_e >= td_R.length) {
                td_e = 0;
            }
        }
        return td_b.join("");
    } catch (td_Q) {
        return null;
    }
}

td_3K = function(td_l) { 
    try {
        this.td_c = td_l;
        this.td_d = "";
        this.td_f = function(td_D, td_d) {
            if (0 === this.td_d.length) {
                var td_b = this.td_c.substr(0, 32);
                var td_n = "";
                for (var td_j = 32; td_j < td_l.length; td_j += 2) {
                    td_n += String.fromCharCode(parseInt(td_l.substr(td_j, 2), 16));
                }
                this.td_d = td_5d(td_b, td_n);
            }
            if (this.td_d.substr) {
                return this.td_d.substr(td_D, td_d);
            }
        }
        ;
    } catch (td_C) {}
    return null;
}

function decrypt(key, k, v){
    const decoder = new td_3K(key); 
    return decoder.td_f(Number(k), Number(v))
}

module.exports = {
    decrypt: decrypt
}