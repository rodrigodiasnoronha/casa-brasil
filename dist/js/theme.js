var os_event = {
    init: function () {
        this.common(), this.scroll(), this.drop(), this.modal(), this.newsletter(), this.inputEmpty(), this.quantity()
    }, common: function () {
        $("body").on("click", ".slide-show", function () {
            var t, e = $(this).attr("rel"), o = $(this).attr("rev");
            e = "." + e, (t = {})[o] = "0", $(e).show().animate(t, 300), $("body").addClass("noScroll")
        }), $("body").on("click", ".slide-hide", function (t) {
            t.preventDefault();
            var e, t = $(this).attr("rel"), o = $(this).attr("rev");
            e = "." + t, (t = {})[o] = "-100%", $(e).animate(t, 300, function () {
                $(e).hide()
            }), $("body").removeClass("noScroll")
        }), $("body").on("click", ".show", function (t) {
            t.preventDefault();
            t = $(this).attr("rel");
            $("." + t).slideToggle("fast"), $(this).toggleClass("active")
        }), $(".tarja .row").slick({
            dots: !1, infinite: !0, autoplay: !1, slidesToShow: 3, slidesToScroll: 1, responsive: [{
                breakpoint: 1024, settings: {
                    slidesToShow: 3, slidesToScroll: 1, dots: !1
                }
            }, {
                breakpoint: 600, settings: {
                    slidesToShow: 2, slidesToScroll: 1, arrows: !0
                }
            }, {
                breakpoint: 480, settings: {
                    slidesToShow: 1, slidesToScroll: 1
                }
            }]
        }), $(window).width() <= 480 && $(".banner.position-3 .flex").slick({
            dots: !0, autoplay: !1, slidesToShow: 1, slidesToScroll: 1
        }), $("body").on("click", ".protected", function () {
            var t = $(this).attr("rel");
            isLogin ? window.location.href = t : (vtexid.setScopeName(jsnomeSite), vtexid.start({
                returnUrl: t, userEmail: "", locale: "pt-BR", forceReload: !1
            }))
        }), $("body").on("click", ".clmb.next", function (t) {
            t.preventDefault();
            t = $(window).height();
            $(".all-menu a.level-3").removeClass("clmb"), $(".level-2 .wrap-all").css("left", "0"), $(this).next("div").css("left", "0").css("height", t + "px"), $("#nav-store .wrap").addClass("no-scroll")
        }), $("body").on("click", ".nav-back", function (t) {
            var e = $(this).attr("rel");
            $(this).parents("div." + e).css("left", "-100%"), $(this).parents("div." + e).removeClass("current"), $("#nav-store .wrap").removeClass("no-scroll")
        })
    }, drop: function () {
        var o = [], o = ($(".hover-open").hover(function () {
            var t = jQuery.data(this), e = $(this);
            o[t] = setTimeout(function () {
                e.children(".drop").fadeIn(100), o[t] = ""
            }, 100)
        }, function () {
            var t = jQuery.data(this);
            "" != o[t] ? clearTimeout(o[t]) : $(this).children(".drop").fadeOut(0)
        }), []);
        $(".hover-open-all").hover(function () {
            var t = jQuery.data(this), e = $(this);
            o[t] = setTimeout(function () {
                1024 < screen.width && e.children(".drop").fadeIn(100).css("display", "flex"), o[t] = ""
            }, 100)
        }, function () {
            var t = jQuery.data(this);
            "" != o[t] ? clearTimeout(o[t]) : $(this).children(".drop").fadeOut(0)
        }), $("body").on("click", ".click-open", function (t) {
            t.preventDefault(), $(".level-3.drop").slideUp("fast"), $("body .level-2.click-close").addClass("click-open"), $("body .level-2.click-open").removeClass("click-close"), $(this).addClass("click-close").removeClass("click-open").next(".drop").slideDown(200).addClass("current"), isMobile && $(".search").slideUp()
        }), $("body").on("click", ".click-close", function (t) {
            t.preventDefault(), $(".level-3.drop").removeClass("current").slideUp("fast"), $(this).addClass("click-open").removeClass("click-close"), isMobile && $(".search").slideUp()
        }), $("footer .ft-nav .ft-title").on("click", function () {
            $(this).parent().find("ul").slideToggle()
        }), $("footer .ft-social .ft-title").on("click", function (t) {
            t.preventDefault()
        }), $(document).mouseup(function (t) {
            var e = $(".drop.current");
            e.is(t.target) || 0 !== e.has(t.target).length || (e.slideUp(200).removeClass("current"), setTimeout(function () {
                e.prev(".click-close").removeClass("click-close").addClass("click-open")
            }, 100))
        })
    }, scroll: function () {
        $(window).scroll(function (t) {
            300 < $(this).scrollTop() ? $("body").addClass("top-fixed") : $("body").removeClass("top-fixed"), 400 < $(this).scrollTop() ? $("body").addClass("show-top-fixed") : $("body").removeClass("show-top-fixed")
        })
    }, modal: function () {
        $("body").on("click", ".remove-modal", function (t) {
            t.preventDefault(), $(this).parents(".ext-modal").remove(), $("body").removeClass("noScroll")
        }), $("body").on("click", ".hide-modal", function (t) {
            t.preventDefault(), $(this).parents(".ext-modal").hide(), $("body").removeClass("noScroll")
        }), $("body").on("click", ".show-modal", function (t) {
            t.preventDefault();
            t = $(this).attr("rel");
            console.log(t), $("." + t).fadeIn(100), $("body").addClass("noScroll")
        })
    }, newsletter: function () {
        $(".form-newsletter").on("click", ".send", function () {
            var t, e = $("#nname").val(), o = $("#nemail").val();
            esse = $(this), "" == e ? $("#nname").addClass("empty").focus() : os_util.isEmail(o) ? (esse.addClass("load"), t = {
                name: e, email: o, isNewsletterOptIn: !0
            }, setTimeout(function () {
                $.ajax({
                    headers: {
                        Accept: "application/json", "Content-Type": "application/json"
                    },
                    url: "/api/dataentities/NE/documents",
                    async: !1,
                    crossDomain: !0,
                    type: "PUT",
                    data: JSON.stringify(t)
                }).success(function (t) {
                    $(".ft-newsletter fieldset").hide(), $(".ft-newsletter .title").html("Obrigado! <br> Cadastro efetuado com sucesso"), esse.removeClass("load")
                }).fail(function (t) {
                    esse.removeClass("load"), alert("Não foi possível cadastrar seu e-mail")
                })
            }, 50)) : $("#nemail").addClass("empty").focus()
        })
    }, tabs: function () {
        $("body").on("click", ".tabs .tab", function (t) {
            t.preventDefault();
            t = $(this).attr("rel");
            return $(this).parents(".tabs-all").find(".tabs .tab").removeClass("current"), $(this).addClass("current"), $(this).parents(".tabs-all").find(".tab-content").hide(), $(this).parents(".tabs-all").find("." + t).fadeIn(), !1
        })
    }, popup: function () {
        $("body").on("click", ".popup", function () {
            var t = $(this).attr("rel"), e = $(this).attr("pW"), o = $(this).attr("pH"), s = $("text", this).text();
            varWindow = window.open(t, s, "width=" + e + ", height=" + o + ", top=10, left=10")
        })
    }, navinpage: function () {
        $("body").on("click", ".nav-in-page", function () {
            var t = $(this).attr("rel");
            $("html, body").animate({
                scrollTop: $("." + t).offset().top - 120
            }, 1e3)
        })
    }, backtotop: function () {
        $("body").on("click", ".nav-top-page", function () {
            $("html, body").animate({
                scrollTop: 0
            }, 1e3)
        })
    }, quantity: function () {
        $("body").on("click", ".update-qty.remove", function (t) {
            t.preventDefault();
            var t = $(this).parents(".qty").find(".select-qty"), e = t.val();
            1 < (e = "" == e ? 2 : e) && t.val(parseInt(e) - 1).trigger("change")
        }), $("body").on("click", ".update-qty.add", function (t) {
            t.preventDefault();
            var t = $(this).parents(".qty").find(".select-qty"), e = t.val();
            "" == e && (e = 0), t.val(parseInt(e) + 1).trigger("change")
        })
    }, inputEmpty: function () {
        $("body").on("keypress", "input.empty, textarea.empty", function () {
            $(this).removeClass("empty")
        })
    }
}, idorder = "", urlCopy = "", gtmCart = {
    init: function () {
        this.cartConfig(), this.updateCart(), this.qtyAdd(), this.qtyRemove(), this.qtyUpdate(), this.skuRemove(), this.shipping(), this.coupon(), this.share()
    }, disableCart: function () {
        $(".cartSkuQuantity button, .cartSkuQuantity .select-qty").addClass("disable").removeClass("enable"), $(".cartSkuQuantity .select-qty").attr("readonly", "readonly"), $(".resume-cart").addClass("load")
    }, enableCart: function () {
        $(".cartSkuQuantity button, .cartSkuQuantity .select-qty").addClass("enable").removeClass("disable"), $(".cartSkuQuantity .select-qty").removeAttr("readonly"), $(".cart-qty").removeClass("read"), $(".resume-cart").removeClass("load")
    }, cartLayout: function () {
        var t = $(window).height();
        $(window).width(), $(document).height();
        $(".wrap-minicart, .resume-cart").css("height", t + "px"), $(".cart-itens").css("height", t - 460 + "px")
    }, copy: function () {
        var t = document.getElementById("cartCopy");
        t.select(), t.setSelectionRange(0, 99999), document.execCommand("copy"), $(".link-copy, .su-copy").addClass("active")
    }, share: function () {
        $("body").on("click", ".btn-copy", function () {
            $(".close-minicart").click(), $("body").append('<div class="ext-modal jn-copy"><div class="wrap-modal"><div class="inner"><div class="dialog"><a class="close remove-modal">×</a><div class="title-copy">Compartilhar carrinho</div><div class="wp-copy"><label for="cartCopy">URL:</label><input type="text" value="' + urlCopy + '" id="cartCopy" name="cartCopy"><button onclick="gtmCart.copy()" class="link-copy">Copiar</button></div><div class="su-copy">Copiado com sucesso</div></div></div></div></div>')
        })
    }, cartConfig: function () {
        $(".resume-cart").html('<div class="cart-wrap"><div class="cart-header"><h4 class="title">Sua sacola</h4></div><div class="cart-content"><div class="cart-itens"><div class="cart-wrap-itens"></div></div></div><div class="cart-footer"><div class="row cart-calc"><div class="row coupon"><a class="hide remove-coupon">Remover cupom</a><label for="coupon">Cupom de<br> desconto</label><input type="text" name="coupon" id="coupon" autocomplete="off"><button class="calc-coupon">Ok</button></div><div class="row shipping"><label for="zipcode">Calcule<br> o frete</label><input type="text" name="zipcode" id="zipcode" maxlength="9" onkeypress="return os_util.isNumberKey(event,this)" autocomplete="off"><button class="calc-shipping">Ok</button></div></div><div class="cart-summary"><div class="hide row coupon"><span class="txt">Desconto</span><strong class="value"></strong></div><div class="hide row shipping"><span class="txt">Frete</span><strong class="value"></strong></div><div class="row total"><span class="txt">Subtotal</span><strong class="value"></strong></div></div><div class="row cart-action"><button class="btn-copy">Compartilhar carrinho</button><a class="btn-cart" href="/checkout/#/cart"><span>Finalizar compra</span></a><div class="continue"><a class="slide-hide" rev="right" rel="nav-cart">Continuar comprando</a></div></div></div></div><div class="cart-modal"></div>').addClass("load"), gtmCart.cartLayout()
    }, updateCart: function () {
        vtexjs.checkout.getOrderForm().done(function (t) {
            idorder = t.orderFormId, gtmCart.listCart(t, 0)
        })
    }, listCart: function (t, e, o) {
        var s, a, i, n, r = 0;
        0 < t.items.length ? (urlCopy = window.location.protocol + "//" + window.location.hostname + "/checkout/?orderFormId=" + idorder + "#/cart", s = "", a = t.shippingData, i = t.totalizers, n = t.ratesAndBenefitsData, $.each(t.items, function (t, e) {
            cartName = e.name, cartId = e.id, cartQty = e.quantity, cartImage = e.imageUrl, cartPrice = e.price, cartUrl = e.detailUrl, cartClass = "", s += '<ul class="row cart-group item-' + t + '" rel="' + t + '"><li class="cartSkuImage"><a href="' + cartUrl + '"><img src="' + cartImage + '" alt="' + cartName + '"></a></li><li class="cartSkuDados"><div class="cartSkuName"><a href="' + cartUrl + '">' + cartName + '</a></div><div class="cartSkuQuantity"><div class="row cart-qty"><label>Qtde.:</label><span><button class="remove-cart-qty disable">-</button><input type="text" onkeypress="return os_util.isNumberKey(event,this)" class="select-qty disable" maxlength="4" readonly value="' + cartQty + '"><button class="add-cart-qty disable">+</button></span></div></div><div class="cartSkuPrice"><span class="cartValue">R$ ' + os_util.formatCurrency(cartPrice) + '</span></div></li><li class="cartSkuRemove"><a class="removeItem" rel="' + t + '">×</a></li></ul>', r += cartQty
        }), $(".resume-cart .cart-itens").html('<div class="cart-wrap-itens">' + s + "</div>"), null != a && 0 < a.selectedAddresses.length && ($("#zipcode").val(a.address.postalCode), $.each(i, function (t, e) {
            "Shipping" == e.id && (0 == e.value ? $(".shipping").show().find(".value").html("Grátis") : $(".shipping").show().find(".value").html("R$ " + os_util.formatCurrency(e.value)))
        })), null != n && 0 < n.rateAndBenefitsIdentifiers.length && ($(".remove-coupon").css("display", "block"), $.each(i, function (t, e) {
            "Discounts" == e.id && $(".coupon").show().find(".value").html("R$ " + os_util.formatCurrency(e.value))
        })), $(".resume-cart .cart-summary .total .value").html("R$ " + os_util.formatCurrency(t.value)), $(".cart-footer, .cart-header").show(), gtmCart.enableCart()) : ($(".cart-itens").html('<div class="empty-mini-cart"><i class="s-icon icon-cart"></i> <p>A sua sacola de compras<br>está vazia.</p></div>'), $(".cart-footer, .cart-header").hide()), $(".mini-cart .total-qty").html(r), $(".cart-wrap").show()
    }, qtyAdd: function () {
        $(".resume-cart").on("click", ".add-cart-qty.enable", function () {
            var t = parseInt($(this).parents(".cart-qty").find(".select-qty").val()) + 1;
            $(this).parents(".cart-qty").find(".select-qty").val(t).trigger("change")
        })
    }, qtyRemove: function () {
        $(".resume-cart").on("click", ".remove-cart-qty.enable", function () {
            var t = parseInt($(this).parents(".cart-qty").find(".select-qty").val()) - 1;
            0 < t && $(this).parents(".cart-qty").find(".select-qty").val(t).trigger("change")
        })
    }, qtyUpdate: function () {
        $(".resume-cart").on("change", ".select-qty.enable", function () {
            var t = $(this).parents(".cart-group").attr("rel"), e = parseInt($(this).val());
            gtmCart.disableCart(), gtmCart.qtyRefresh(t, e), $(this).parents(".cart-qty").addClass("read")
        })
    }, qtyRefresh: function (e, o) {
        vtexjs.checkout.getOrderForm().then(function (t) {
            t.items[0];
            t = {
                index: parseInt(e), quantity: parseInt(o)
            };
            return vtexjs.checkout.updateItems([t], null, !1)
        }).done(function (t) {
            gtmCart.listCart(t, 0)
        })
    }, skuRemove: function () {
        $(".resume-cart").on("click", ".removeItem", function () {
            var e = parseInt($(this).attr("rel"));
            gtmCart.disableCart(), vtexjs.checkout.getOrderForm().then(function (t) {
                t.items[0];
                return vtexjs.checkout.removeItems([{
                    index: e, quantity: 0
                }])
            }).done(function (t) {
                gtmCart.listCart(t, 0)
            })
        })
    }, shipping: function () {
        $("body").on("keypress", ".cart-footer #zipcode", function () {
            os_util.maskZip(this, "#####-###")
        }), $("body").on("click", ".calc-shipping", function () {
            var e = $(".cart-footer #zipcode").val();
            9 != e.length ? $(".cart-footer #postalCart").addClass("empty").focus() : (gtmCart.disableCart(), vtexjs.checkout.getOrderForm().then(function (t) {
                return vtexjs.checkout.calculateShipping({
                    postalCode: e, country: "BRA"
                })
            }).done(function (t) {
                gtmCart.listCart(t, 0)
            }))
        })
    }, coupon: function () {
        $("body").on("click", ".calc-coupon", function () {
            var e = $(".cart-footer #coupon").val();
            "" == e ? $(".cart-footer #coupon").addClass("empty").focus() : (gtmCart.disableCart(), vtexjs.checkout.getOrderForm().then(function (t) {
                return vtexjs.checkout.addDiscountCoupon(e)
            }).done(function (t) {
                $(".cart-footer #coupon").val(""), gtmCart.listCart(t, 0)
            }))
        }), $("body").on("click", ".remove-coupon", function () {
            $(this).hide(), gtmCart.disableCart(), vtexjs.checkout.getOrderForm().then(function (t) {
                return vtexjs.checkout.removeDiscountCoupon()
            }).done(function (t) {
                $(".cart-summary .coupon").hide(), gtmCart.listCart(t, 0)
            })
        })
    }
}, isMobile = !1, os_mobile = {
    init: function () {
        this.setup(), this.event()
    }, setup: function () {
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (isMobile = !0, $(".hover-open").removeClass("hover-open").find(".sub-open").addClass("click-open").removeAttr("href"))
    }, event: function () {
        var t = $(window).height();
        1023 < $(window).width() ? ($(".search, .left-bar, .nav-store, #nav-store .wrap").removeAttr("style"), $(".level-2.clmb").removeClass("click-open"), $("#nav-store .cta").addClass("drop"), $("div.level-3").removeClass("drop").removeAttr("style")) : ($(".left-bar, .nav-store, #nav-store .wrap").css("height", t + "px"), $(".left-bar, .wrap-filters, #nav-store, #nav-store .wrap").css("height", t + "px"), $(".level-2.clmb").addClass("click-open"), $("#nav-store .cta").removeClass("drop"), $("div.level-3").addClass("drop")), $(".wrap-minicart, .resume-cart").css("height", t + "px"), $(".cart-itens").css("height", t - 460 + "px")
    }
}, os_shelf = {
    init: function () {
        $(".list-prod.shelf").length && (this.event(), this.setup())
    }, setup: function () {
        $.each($(".shelf .ct"), function () {
            var t, e;
            $(this).hasClass("loaded") || $(this).find(".price-list").length && (t = $(".price-list", this).text(), e = $(".price-best", this).text(), e = (t = os_util.extraiValor(t)) - (e = os_util.extraiValor(e)), e = Math.floor(e = e / t * 100) + "%", $(".flag.off", this).html(e), $(".shelf-discount", this).show(), $(this).addClass("loaded"))
        })
    }, event: function () {
        $("body").on("click", ".shelf-buy", function (t) {
            t.preventDefault();
            var t = $(this), e = t.parents(".ct").attr("data-sku"), o = t.parents(".ct").find(".select-qty").val(),
                s = (isNaN(o) && (o = 1), "/checkout/cart/add?sc=1&sku=" + e + "&qty=" + (o = o < 1 ? 1 : o) + "&seller=1");
            t.addClass("load"), setTimeout(function () {
                os_util.buyOnPage(s, o, e)
            }, 50)
        })
    }
}, isLogin = !1, userEmail = "", os_store = (jQuery.expr[":"].icontains = function (t, e, o) {
    return 0 <= jQuery(t).text().toUpperCase().indexOf(o[3].toUpperCase())
}
    , {
    init: function () {
        this.menu(), this.setup(), this.getInstance(), this.welcome()
    }, menu: function () {
        $.ajax({
            type: "GET",
            url: "/api/catalog_system/pub/category/tree/2",
            cache: !1,
            dataType: "json",
            success: function (t) {
                isMobile && ($(".hover-open").removeClass("hover-open").find(".sub-open").addClass("click-open").removeAttr("href"), $(".hover-open-all").removeClass("hover-open-all").find(".sub-open").addClass("click-open").removeAttr("href")), $(".nav-departament > ul.flex").prepend($(".nav-store .all-menu")), $(".nav-store .all-menu").css("display", "block"), os_event.init()
            }
        })
    }, setup: function () {
        $(".header .search .btn-buscar").after($(".ui-autocomplete")), $("li.helperComplement").remove()
    }, getInstance: function () {
        var controller = $("meta[name=controller]").attr("content");
        eval(controller).init()
    }, welcome: function () {
        $.get("/no-cache/profileSystem/getProfile").done(function (t) {
            var e;
            t.IsUserDefined ? (isLogin = !0, userEmail = t.Email, e = t.FirstName, null == t.FirstName && (e = userEmail), $(".nav-user .btn-link .txt").html("Seja bem vindo<br> <em>" + e + "</em>"), $(".nav-user li.logout").show(), $(".nav-user li.login").remove()) : (isLogin = !1, $(".nav-user li.login").show()), $(".nav-user .btn-link").css("opacity", "1")
        })
    }, autoSearch: function () {
        $(".ui-autocomplete li").each(function () {
            var t, e = $(this);
            0 < e.find("img").length && (t = (t = e.find("img").attr("src")).replace("-25-25", "-120-120"), e.find("img").attr("src", t), e.addClass("hasImage"))
        }), $(".product-found").length <= 0 && $(".hasImage").wrapAll('<ul class="product-found"></ul>')
    }
}), map = ($(document).ajaxStop(function () {
    $("li.helperComplement").remove(), $(".ui-autocomplete li").length && os_store.autoSearch()
}), window.onresize = function (t) {
    os_mobile.event()
}
    , {
    "â": "a",
    "Â": "A",
    "à": "a",
    "À": "A",
    "á": "a",
    "Á": "A",
    "ã": "a",
    "Ã": "A",
    "ê": "e",
    "Ê": "E",
    "è": "e",
    "È": "E",
    "é": "e",
    "É": "E",
    "î": "i",
    "Î": "I",
    "ì": "i",
    "Ì": "I",
    "í": "i",
    "Í": "I",
    "õ": "o",
    "Õ": "O",
    "ô": "o",
    "Ô": "O",
    "ò": "o",
    "Ò": "O",
    "ó": "o",
    "Ó": "O",
    "ü": "u",
    "Ü": "U",
    "û": "u",
    "Û": "U",
    "ú": "u",
    "Ú": "U",
    "ù": "u",
    "Ù": "U",
    "ç": "c",
    "Ç": "C",
    " ": "-",
    "&": "e"
}), os_util = {
    strToClass: function (t) {
        return t.replace(/[\W\[\] ]/g, function (t) {
            return map[t] || t
        }).toLowerCase()
    }, isNumberKey: function (t, e) {
        t = t.which || event.keyCode;
        return !(-1 != e.value.indexOf(".") && 46 == t || 46 != t && 31 < t && (t < 48 || 57 < t))
    }, isEmail: function (t) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(t)
    }, maskZip: function (t, e) {
        var o = t.value.length, s = e.substring(1, 0), e = e.substring(o);
        e.substring(0, 1) != s && (t.value += e.substring(0, 1))
    }, extraiValor: function (t) {
        return parseFloat(t.replace(",", ".").replace(/(\d)(\.)(?=\d\d\d)/g, "$1").slice(3))
    }, formatFloatReal: function (t) {
        var e = t.toString().slice(-2);
        return "R$ " + t.toString().slice(0, -3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "," + e
    }, formatCurrency: function (t) {
        var t = t + "", e = !1;
        return 0 == t.indexOf("-") && (e = !0, t = t.replace("-", "")), 0 == (t = 0 == (t = 12 < (t = 9 < (t = 6 < (t = (t = 1 == t.length ? "0" + t : t).replace(/([0-9]{2})$/g, ",$1")).length ? t.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2") : t).length ? t.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3") : t).length ? t.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4") : t).indexOf(".") ? t.replace(".", "") : t).indexOf(",") && (t = t.replace(",", "0,")), e ? "-" + t : t
    }, createCookie: function (t, e, o) {
        var s, a = "";
        o && ((s = new Date).setTime(s.getTime() + 24 * o * 60 * 60 * 1e3), a = "; expires=" + s.toUTCString()), document.cookie = t + "=" + e + a + "; path=/"
    }, readCookie: function (t) {
        for (var e = t + "=", o = document.cookie.split(";"), s = 0; s < o.length; s++) {
            for (var a = o[s]; " " == a.charAt(0);) a = a.substring(1, a.length);
            if (0 == a.indexOf(e)) return a.substring(e.length, a.length)
        }
        return null
    }, removeCookie: function (t) {
        os_util.createCookie(t, "", -1)
    }, encripta: function (t) {
        for (var e, o = "", s = 0, a = 0; a < t.length; a++) s++, e = os_util.asc(t.substr(a, 1)) + os_util.asc("assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm".substr(s, 1)), 50 == s && (s = 1), 255 < e && (e -= 256), o += os_util.chr(e);
        document.getElementById("1").value = o
    }, descripta: function (t) {
        for (var e, o = "", s = 0, a = 0; a < t.length; a++) s++, e = os_util.asc(t.substr(a, 1)) - os_util.asc("assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm".substr(s, 1)), 50 == s && (s = 1), e < 0 && (e += 256), o += os_util.chr(e);
        document.getElementById("2").value = o
    }, asc: function (t) {
        return t.charCodeAt(0)
    }, chr: function (t) {
        return String.fromCharCode(t)
    }, buyOnPage: function (t, e, o) {
        console.log();
        var s = {
            id: parseInt(o), quantity: parseInt(e), seller: "1"
        };
        vtexjs.checkout.addToCart([s], null, 1).done(function (t) {
            setTimeout(function () {
                gtmCart.listCart(t, e, o), $(".open-minicart").click(), $(".buy-button.load, .shelf-buy.load, .buy-button-multiple.load").removeClass("load").addClass("loaded")
            }, 50)
        })
    }
}, pg404 = {
    init: function () {
        this.setup()
    }, setup: function () {
    }
}, pgAccount = {
    init: function () {
    }, setup: function () {
    }, event: function () {
    }
}, pgCatalog = {
    init: function () {
        this.event(), this.setup()
    }, setup: function () {
        $(".header-category .title").html(vtxctx.categoryName), pgCatalog.orderby(), $(".navigation-tabs input[type='checkbox']").vtexSmartResearch({
            emptySearchMsg: "<h3>Ops! Esta combinação de filtros não retornou nenhum resultado.</h3><div></div>",
            filtersMenu: ".navigation-tabs",
            filterScrollTop: function () {
                document.body.scrollHeight;
                $("html, body").animate({
                    scrollTop: pScroll
                }, 0)
            },
            ajaxCallback: function () {
            }
        })
    }, event: function () {
    }, orderby: function () {
        var s = $(".orderBy:eq(0) select").attr("onchange"), a = "";
        s = (s = s.split("href= '"))[1].split("' + 'O="), $(".orderBy:eq(0) option").each(function () {
            var t = "", e = $(this).val(), o = $(this).text();
            $(this).is(":selected") && (t = "current-order", $(".btn-orderby .selected").text(o)), a += '<li><a href="' + s[0] + "O=" + e + '" class="' + t + '">' + o + "</a></li>"
        }), $(".btn-orderby .selected").css("opacity", "1"), $(".select-orderby").html(a), $(".list-orderby li:eq(0) a").remove(), $(".list-orderby li:eq(0), .list-orderby li:eq(4)").remove(), $(".list-orderby li a.current-order").attr("href", "javascript:void(0);"), $(".list-orderby").show()
    }
}, pgContact = (pgCollection = {
    init: function () {
        this.setup()
    }, setup: function () {
        var t = $(".header-category h1").text();
        $(".bread-crumb ul").append('<li class="last">' + t + "</li>"), pgCatalog.orderby(), $(".navigation-tabs input[type='checkbox']").vtexSmartResearch({
            emptySearchMsg: "<h3>Ops! Esta combinação de filtros não retornou nenhum resultado.</h3><div></div>",
            filtersMenu: ".navigation-tabs",
            filterScrollTop: function () {
                document.body.scrollHeight;
                $("html, body").animate({
                    scrollTop: pScroll
                }, 0)
            },
            ajaxCallback: function () {
            }
        })
    }
}, {
    init: function () {
        this.event(), this.setup()
    }, setup: function () {
        $("#cpnone").mask("(00)000000000")
    }, event: function () {
        $(".form-contact").on("click", ".send", function () {
            var t, e = $("#cname").val(), o = $("#cemail").val(), s = $("#cpnone").val(), a = $("#cmessage").val(),
                i = $("#subject").val(), n = "CS", r = $(this);
            "Pedido E-Commerce" == i && (n = "CO"), "" == e ? $("#cname").addClass("empty").focus() : os_util.isEmail(o) ? "" == s ? $("#cpnone").addClass("empty").focus() : "" == a ? $("#cmessage").addClass("empty").focus() : (r.addClass("load"), t = {
                cname: e, cemail: o, cpnone: s, cmessage: a, csubject: i
            }, setTimeout(function () {
                $.ajax({
                    headers: {
                        Accept: "application/json", "Content-Type": "application/json"
                    },
                    url: "/api/dataentities/" + n + "/documents",
                    async: !1,
                    crossDomain: !0,
                    type: "PUT",
                    data: JSON.stringify(t)
                }).success(function (t) {
                    $(".form-contact fieldset").hide(), $(".form-contact .success").fadeIn(), r.removeClass("load")
                }).fail(function (t) {
                    r.removeClass("load"), alert("Não foi possível cadastrar seu e-mail")
                })
            }, 50)) : $("#cemail").addClass("empty").focus()
        })
    }
}), pgEmpty = {
    init: function () {
        this.setup()
    }, setup: function () {
        var t = $("meta[name=Abstract]").attr("content"), t = decodeURIComponent(escape(t));
        $(".digitado").html(t), $(".collection.group-4 h2 + ul").slick({
            infinite: !1, dots: !0, arrows: !0, slidesToShow: 4, slidesToScroll: 1, responsive: [{
                breakpoint: 1025, settings: {
                    slidesToShow: 3, slidesToScroll: 1
                }
            }, {
                breakpoint: 481, settings: {
                    slidesToShow: 2, slidesToScroll: 1
                }
            }]
        })
    }
}, pgExport = {
    init: function () {
        this.event(), this.setup()
    }, setup: function () {
    }, event: function () {
    }
}, pgHome = {
    init: function () {
        this.setup(), this.event()
    }, setup: function () {
        $(".banner.position-1 .desktop .row, .banner.position-1 .mobile .row").slick({
            infinite: !0,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !1,
            autoplay: !0,
            autoplaySpeed: 2e3,
            speed: 1e3,
            dots: !0
        }), $(".banner.position-2 .row").slick({
            dots: !1, infinite: !0, autoplay: !1, slidesToShow: 7, slidesToScroll: 1, responsive: [{
                breakpoint: 1024, settings: {
                    slidesToShow: 6, slidesToScroll: 1, infinite: !0, dots: !1
                }
            }, {
                breakpoint: 600, settings: {
                    slidesToShow: 4, slidesToScroll: 1
                }
            }, {
                breakpoint: 480, settings: {
                    slidesToShow: 2, slidesToScroll: 1, arrows: !1, centerMode: !0, centerPadding: "30px"
                }
            }]
        }), $(window).width() <= 480 && ($(".banner.position-3 .flex").removeClass("flex").addClass("row"), $(".banner.position-3 .row").slick({
            dots: !0, autoplay: !1, slidesToShow: 1, slidesToScroll: 1, arrows: !1
        })), $(".banner.position-2 .box-banner").each(function (t) {
            var e = $(this).find("img").attr("alt");
            $(this).append("<p>" + e + "</p>")
        }), $(".collection.group-1 h2 + ul, .collection.group-2 h2 + ul, .collection.group-3 h2 + ul").slick({
            infinite: !1, dots: !1, arrows: !0, slidesToShow: 4, slidesToScroll: 1, responsive: [{
                breakpoint: 1025, settings: {
                    slidesToShow: 3, slidesToScroll: 1
                }
            }, {
                breakpoint: 481, settings: {
                    arrows: !1, dots: !0, slidesToShow: 2, slidesToScroll: 2
                }
            }]
        })
    }, event: function () {
    }
}, pgInstitucional = {
    init: function () {
        this.setup(), this.event()
    }, setup: function () {
        var t = $(".custom .post h2:eq(0)").text();
        $(".bread-crumb ul").append('<li class="last">' + t + "</li>"), $(".page-curriculum").length && ($("#cpnone").mask("(00) 000000000"), $(".custom-form").append('<input type="hidden" name="temAnexo" id="temAnexo">')), $(".page-contact").length && $("#cpnone").mask("(00) 000000000")
    }, event: function () {
        $("body").on("change", "input#curriculo", function () {
            var t = $(this).val();
            $("input#curriculo")[0].files[0].name, $("input#curriculo")[0].files[0].type, $("input#curriculo")[0].files[0].size;
            "" != t || null != t ? $("#temAnexo").val("true") : $("#temAnexo").val("")
        }), $(".page-curriculum").on("click", ".custom-form .send", function () {
            var t, e = $("#cname").val(), o = $("#cemail").val(), s = $("#cpnone").val(), a = $("#cmessage").val(),
                i = $("#temAnexo").val(), n = $(this);
            "" == e ? $("#cname").addClass("empty").focus() : os_util.isEmail(o) ? "" == s ? $("#cpnone").addClass("empty").focus() : "" == i ? alert("Você precisa selecionar seu currículo") : (n.addClass("load"), i = $("#curriculo").prop("files")[0], (t = new FormData).append("file", i), setTimeout(function () {
                $.ajax({
                    url: "https://natone3.websiteseguro.com/institucional/upload.php",
                    dataType: "text",
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    data: t,
                    type: "post",
                    success: function (t) {
                        t = t.replace(/\s+/g, "");
                        console.log(t), 50 < t.length && (console.log("tem"), $.ajax({
                            headers: {
                                Accept: "application/json", "Content-Type": "application/json"
                            },
                            url: "/api/dataentities/CC/documents",
                            async: !1,
                            crossDomain: !0,
                            type: "PUT",
                            data: JSON.stringify({
                                ename: e,
                                eemail: o,
                                ephone: s,
                                emessage: a,
                                curriculo: "http://institucional.natone.com.br/" + t
                            })
                        }).success(function (t) {
                            $(".curriculo fieldset").hide(), $(".curriculo .success").fadeIn(), n.removeClass("load")
                        }).fail(function (t) {
                            n.removeClass("load"), alert("Não foi possível cadastrar seu currículo")
                        }))
                    }
                })
            }, 50)) : $("#cemail").addClass("empty").focus()
        }), $(".nossas-lojas .buttons span").on("click", function () {
            var t = $(this).attr("class").substring(7, 0);
            $(this).parent().find(".active").removeClass("active"), $(this).addClass("active"), $(".lojas").find(".active").removeClass("active"), $(".lojas").find("." + t).addClass("active")
        }), $(".nossas-lojas .lojas .text span").on("click", function () {
            var t = $(this).attr("class").substring(7, 0);
            return console.log(t), $(".maps").find(".active").removeClass("active"), $(".maps").find("." + t).addClass("active"), $("html, body").animate({
                scrollTop: $(".maps").offset().top - 50
            }, 500), !1
        }), $(".page-contact").on("click", ".custom-form .send", function (t) {
            t.preventDefault();
            var e = $("#cname").val(), o = $("#cemail").val(), s = $("#cpnone").val(), a = $("#cmessage").val();
            $(this);
            "" == e ? ($(".form_name").find("input").css("border-color", "#EE3A62"), $(".form_name").find(".error_msg").remove(), $(".form_name").append("<span class='error_msg'>Preencha esse campo</span>")) : os_util.isEmail(o) ? "" == s ? ($(".form_tel").find("input").css("border-color", "#EE3A62"), $(".form_tel").find(".error_msg").remove(), $(".form_tel").append("<span class='error_msg'>Preencha esse campo</span>")) : "" == a ? ($(".form_message").find("input").css("border-color", "#EE3A62"), $(".form_message").find(".error_msg").remove(), $(".form_message").append("<span class='error_msg'>Digite sua mensagem</span>")) : ($("button.send").attr("disabled", "disabled").text("Enviando..."), setTimeout(function () {
                $.ajax({
                    headers: {
                        Accept: "application/json", "Content-Type": "application/json"
                    },
                    url: "/api/dataentities/CT/documents",
                    async: !1,
                    crossDomain: !0,
                    type: "POST",
                    data: JSON.stringify({
                        ename: e, eemail: o, ephone: s, emessage: a
                    })
                }).success(function (t) {
                    $("button.send").text("Enviar").removeAttr("disabled"), $(".custom-form").find(".message_action").remove(), $(".custom-form").prepend("<div class='message_action success'>Formulário enviado com sucesso!</div>"), $(".custom-form input, .custom-form textarea").val("").css("border-color", "#ccc"), $(".custom-form .error_msg").remove()
                }).fail(function (t) {
                    $("button.send").text("Enviar").removeAttr("disabled"), $(".custom-form").find(".message_action").remove(), $(".custom-form").prepend("<div class='message_action error'>Não foi possível enviar. Tente novamente.</div>")
                })
            }, 50)) : ($(".form_email").find("input").css("border-color", "#EE3A62"), $(".form_email").find(".error_msg").remove(), $(".form_email").append("<span class='error_msg'>Preencha esse campo corretamente</span>"))
        })
    }
}, pgProduct = {
    init: function () {
        this.event(), this.setup()
    }, setup: function () {
        $(".image-product").vtexImage({
            fullscreen: !1, zoom: !0, typeZoom: "click", thumb: 20
        });
        var t = skuJson_0.skus[0].bestPriceFormated, t = os_util.extraiValor(t);
        t = (t *= .95).toFixed(2), $(".discount-avista .value").html(os_util.formatFloatReal(t)), $(".collection.group-5 h2 + ul, .collection.group-6 h2 + ul").slick({
            infinite: !1, dots: !0, arrows: !0, slidesToShow: 4, slidesToScroll: 1, responsive: [{
                breakpoint: 1025, settings: {
                    slidesToShow: 3, slidesToScroll: 1
                }
            }, {
                breakpoint: 481, settings: {
                    slidesToShow: 2, slidesToScroll: 2
                }
            }]
        })
    }, event: function () {
        os_event.navinpage(), $("body").on("click", ".buy-button", function (t) {
            t.preventDefault();
            var t = $(this), o = t.attr("href"), s = $(".info-product .select-qty").val();
            (s = isNaN(s) ? 1 : s) < 1 && (s = 1), 1 < o.indexOf("alert") ? $(".sku-selector-container").addClass("empty") : (t.addClass("load"), setTimeout(function () {
                var t = o.split("sku=")[1].split("&qty=")[0],
                    e = "/checkout/cart/add?sc=1&sku=" + t + "&qty=" + s + "&seller=1";
                os_util.buyOnPage(e, s, t)
            }, 50))
        }), $("body").on("click", ".topic li.skuList label", function () {
            $(".sku-selector-container").removeClass("empty")
        }), $(".comprar-flutuante .update-qty").on("click", function () {
            setTimeout(function () {
                $(".info-product .select-qty").val($(".comprar-flutuante .select-qty").val())
            }, 500)
        }), $(".info-product .update-qty").on("click", function () {
            setTimeout(function () {
                $(".comprar-flutuante .select-qty").val($(".info-product .select-qty").val())
            }, 500)
        })
    }
}, pgWishlistAdd = (pgSearch = {
    init: function () {
        this.setup()
    }, setup: function () {
        var t = $(".resultado-busca-numero:eq(0) .value").text();
        $(".total-products .value").html(t), pgCatalog.orderby(), $(".navigation-tabs input[type='checkbox']").vtexSmartResearch({
            emptySearchMsg: "<h3>Ops! Esta combinação de filtros não retornou nenhum resultado.</h3><div></div>",
            filtersMenu: ".navigation-tabs",
            filterScrollTop: function () {
                document.body.scrollHeight;
                $("html, body").animate({
                    scrollTop: pScroll
                }, 0)
            },
            ajaxCallback: function () {
            }
        })
    }
}, {
    init: function () {
    }, setup: function () {
        var t, e, o = skuJson.skus[0].sku;
        $(".load-wishlist").length && ($(".glis-mylist li.type-4").length ? (t = $(".glis-mylist a.glis-submit-list:eq(0)").text(), e = {
            GiftListId: $(".glis-mylist a.glis-submit-list:eq(0)").attr("rel"), CheckedItems: o, AddToQuantity: 1
        }, pgWishlistAdd.addlist(e, "/no-cache/giftlistv2/skutolist", t)) : (e = {
            GiftListName: t = "l" + (new Date).getTime().toString(),
            GiftListTypeId: "4",
            UrlFolder: "",
            CheckedItems: o,
            AddToQuantity: 1
        }, pgWishlistAdd.addlist(e, "/no-cache/giftlistv2/skutonewlist", t)))
    }, msg: function (t) {
        $(".content-wishlist").html('<div class="text"><span><i class="s-icon icon-favoritos"></i> Item adicionado<br> a sua lista</span></div><div class="row action"><p>O que deseja fazer?</p><a class="close-wishlist"><span>Continuar navegando</span></a><a class="see-list" target="_top" href="/list/' + t + '"><span>Ver lista</span></a></div>'), $(".load-wishlist").remove()
    }, addlist: function (t, e, o) {
        var s = o;
        $.ajax({
            type: "POST",
            url: e,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: ko.toJSON(t),
            success: function (t) {
                pgWishlistAdd.msg(s)
            },
            error: function (t) {
                $(".list-form-box").html(t.responseText)
            }
        })
    }
}), pgWishlist = {
    init: function () {
        this.setup(), this.event()
    }, setup: function () {
        var t = $(".resultado-busca-numero:eq(0) .value").text();
        $(".header-category .total-list .value").html(t)
    }, event: function () {
        var o = $(".header-category .total-list .value");
        $("body").on("click", ".list-prod .remove-item", function () {
            var e = $(this),
                t = (idsku = e.parents("li").find(".ct").attr("data-sku"), qtyCurrent = o.text(), qtyNew = parseInt(qtyCurrent) - 1, "/no-cache/giftlistv2/changewishedamount/{0}/{1}/{2}".format(jscheckoutGiftListId, idsku, 0));
            $.post(t, function (t) {
                e.parents("li").remove(), o.html(qtyNew), qtyNew
            })
        })
    }
}, pgManage = {
    init: function () {
        this.setup()
    }, setup: function () {
        var t = $(".type-4 .action-view a"), e = $(".giftlist-body-desired").text();
        !t.length || 0 == parseInt(e) ? $(".empty-list").show() : window.location.href = t.attr("href")
    }
};

function closeAddList() {
    $(".jn-wishlist .remove-modal").click()
}

$(document).ready(function () {
    gtmCart.init(), os_store.init(), os_mobile.init(), os_shelf.init(), os_mobile.event()
});
