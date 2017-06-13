require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({5:[function(require,module,exports){
var $ = require('jquery')
var data = require('./data/implementations_data')
require('./common')

$(function () {
  $.each(data, function (name, names) {
    showData(name)
  })

  function showData (tableName) {
    var $section = $('#' + tableName.toLowerCase())
    var $table = $section.find('table')
    var categories = []

    var tr = document.createElement('tr')
    tr.classList.add('head-row')
    var th = document.createElement('th')
    th.classList.add('head-col')
    tr.appendChild(th)

    $.each(data[tableName], function (item, items) {
      $.each(items, function (key, values) {
        if ($.inArray(key, categories) === -1) {
          categories.push(key)
          var th = document.createElement('th')
          th.textContent = key
          tr.appendChild(th)
        }
      })
    })
    $table.append(tr)

    $.each(data[tableName], function (item, items) {
      var tr = document.createElement('tr')
      var th = document.createElement('th')
      th.classList.add('head-col')
      th.textContent = item
      tr.appendChild(th)

      $.each(categories, function (n, col) {
        var td = document.createElement('td')
        var i = document.createElement('i')
        var status = 'grey'
        i.classList.add('icon-hexagon')
        if (items[col] && items[col].status) {
          switch (items[col].status.toLowerCase()) {
            case 'done':
              status = 'green'
              break
            case 'usable':
              status = 'yellow'
              break
            case 'unstable':
              status = 'red'
              break
            default:
              status = 'grey'
          }

          if (items[col].url && items[col].url.length) {
            var a = document.createElement('a')
            a.setAttribute('href', items[col].url)
            a.appendChild(i)
          }
        }
        i.classList.add(status)
        td.appendChild(a || i)
        tr.appendChild(td)
      })

      $table.append(tr)
    })

    tr = document.createElement('tr')
    tr.classList.add('empty')

    th = document.createElement('th')
    th.classList.add('head-col')
    tr.appendChild(th)

    for (var n = 0; n < categories.length; n++) {
      var td = document.createElement('td')
      tr.appendChild(td)
    }
    $table.append(tr)

    $table.width(categories.length * 95)

    var $parent = $table.closest('.table')
    var tableHeight = $parent.find('.title').height() +
            $parent.find('.info').height() +
            ($(window).innerWidth() < 940 ? 0 : $parent.find('.description').height())
    $parent.height(tableHeight)
  }

  $('td').hover(function () {
    $(this).find('i').removeClass('icon-hexagon').addClass('icon-cat')
  }, function () {
    $(this).find('i').addClass('icon-hexagon').removeClass('icon-cat')
  })

  $('a.scroll').on('click', function (e) {
    e.preventDefault()
    var scrollToId = $(this).attr('href')
    var $scrollTo = $(scrollToId)
    $('html, body').animate({scrollTop: $scrollTo.offset().top - 100 - 270}, 1000, 'swing')

    var mobile = $(window).innerWidth() <= 940
    if (mobile) {
      var $columns = $(this).closest('.columns')
      var $links = $columns.closest('.links')
      $columns.css('display', 'none')
      $links.find('.active-link .copy-block').html($(this).html())
    }
  })

  $('.active-link', '.links').on('click', function (e) {
    e.preventDefault()
    var $link = $(this)
    var $parent = $link.closest('.links')
    var $columns = $parent.find('.columns')

    if ($columns.css('display') === 'flex') {
      $columns.css('display', 'none')
    } else {
      $columns.css('display', 'flex')
    }
  })

  $(window).on('load resize scroll', function () {
    fadeInCube()
  })

  function fadeInCube () {
    var $cube = $('main > .cube')
    var $articleImpl = $('article.implementations')
    var $header = $('body > header')
    var scrollTop = $(window).scrollTop()

    var $transports = $('#transports')
    var $other = $('#others')
    var $streamMuxers = $('#stream-muxers')
    var $cryptoChannels = $('#crypto-channels')
    var $connectionUpgrades = $('#connection-upgrades')
    var $peerRouting = $('#peer-routing')
    var $recordStores = $('#record-stores')
    var $natTraversal = $('#nat-traversal')
    var $discovery = $('#discovery')
    var $utils = $('#utils')

    var sectionMarginTop = parseInt($transports.css('margin-top'))
    var headerHeight = $header.outerHeight()

    if (scrollTop >= $articleImpl.outerHeight() - 26 && scrollTop <= $other.offset().top - headerHeight) {
      $cube.addClass('fixed')
    } else {
      $cube.removeClass('fixed')
    }

    // var minHeight = 0
    var maxHeight = 0
    var opacity = 0.0

    if (scrollTop >= 235 &&
            scrollTop <= $transports.offset().top - headerHeight - sectionMarginTop + 140) {
      maxHeight = $transports.offset().top - headerHeight - sectionMarginTop + 140
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.transports').css('opacity', opacity)
    } else {
      $cube.find('.transports').css('opacity', 0)
    }
    if (scrollTop >= $streamMuxers.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $streamMuxers.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $streamMuxers.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.stream-muxers').css('opacity', opacity)
    } else {
      $cube.find('.stream-muxers').css('opacity', 0)
    }
    if (scrollTop >= $cryptoChannels.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $cryptoChannels.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $cryptoChannels.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.crypto-channels').css('opacity', opacity)
    } else {
      $cube.find('.crypto-channels').css('opacity', 0)
    }
    if (scrollTop >= $connectionUpgrades.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $connectionUpgrades.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $connectionUpgrades.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.connection-upgrades').css('opacity', opacity)
    } else {
      $cube.find('.connection-upgrades').css('opacity', 0)
    }
    if (scrollTop >= $peerRouting.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $peerRouting.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $peerRouting.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.peer-routing').css('opacity', opacity)
    } else {
      $cube.find('.peer-routing').css('opacity', 0)
    }
    if (scrollTop >= $recordStores.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $recordStores.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $recordStores.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.record-stores').css('opacity', opacity)
    } else {
      $cube.find('.record-stores').css('opacity', 0)
    }
    if (scrollTop >= $natTraversal.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $natTraversal.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $natTraversal.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.nat-traversal').css('opacity', opacity)
    } else {
      $cube.find('.nat-traversal').css('opacity', 0)
    }
    if (scrollTop >= $discovery.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $discovery.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $discovery.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.discovery').css('opacity', opacity)
    } else {
      $cube.find('.discovery').css('opacity', 0)
    }
    if (scrollTop >= $utils.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $utils.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $utils.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.utils').css('opacity', opacity)
    } else {
      $cube.find('.utils').css('opacity', 0)
    }
    if (scrollTop >= $other.offset().top - headerHeight - sectionMarginTop - 60 &&
            scrollTop <= $other.offset().top - headerHeight - sectionMarginTop - 60 + 200) {
      maxHeight = $other.offset().top - headerHeight - sectionMarginTop - 60 + 200
      opacity = maxHeight !== scrollTop ? 1.0 / (70.0 / (maxHeight - scrollTop)) : 0
      $cube.find('.others').css('opacity', opacity)
    } else {
      $cube.find('.others').css('opacity', 0)
    }
  }

  $(window).on('click', function (e) {
    var $elem = e.target
    var mobile = $(window).innerWidth() <= 767
    if (mobile) {
      if (!$($elem.closest('.links')).length) {
        $('.columns', '.links').css('display', 'none')
      }
    }
  })
})

},{"./common":2,"./data/implementations_data":4,"jquery":7}],4:[function(require,module,exports){
module.exports = {
  'Transports': {
    'libp2p-tcp': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-tcp'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-tcp'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-tcp-transport'
      }
    },
    'libp2p-quic': {
      'Go': {
        status: 'Unstable',
        url: 'https://github.com/marten-seemann/libp2p-quic-transport'
      }
    },
    'libp2p-websockets': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-websockets'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-websockets'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-ws-transport'
      }
    },
    'libp2p-webrtc-star': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-webrtc-star'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-webrtc-star'
      }
    },
    'libp2p-webrtc-direct': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-webrtc-direct'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-webrtc-direct'
      }
    },
    'libp2p-udp': {
      'Node.js': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/js-libp2p-udp'
      },
      'Go': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/go-udp-transport'
      }
    },
    'libp2p-utp': {
      'Node.js': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/js-libp2p-utp'
      },
      'Go': {
        status: 'Usable',
        url: 'https://github.com/libp2p/go-utp-transport'
      }
    }
  },
  'stream-muxers': {
    'libp2p-spdy': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-spdy'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-spdy'
      },
      'Go': {
        status: 'Unstable',
        url: 'https://github.com/docker/spdystream'
      }
    },
    'libp2p-multiplex': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-multiplex'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-multiplex'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/whyrusleeping/go-smux-multiplex'
      }
    },
    'libp2p-yamux': {
      'Go': {
        status: 'Done',
        url: 'https://github.com/hashicorp/yamux'
      }
    }
  },
  'crypto-channels': {
    'libp2p-secio': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-secio'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-secio'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-secio'
      }
    }
  },
  'connection-upgrades': {
    'libp2p-conn': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/interface-connection'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/interface-connection'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-conn'
      }
    },
    'half-closed-connection-upgrade': {
      'Browser JS': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/js-libp2p-half-closed-connection-upgrade'
      },
      'Node.js': {
        status: 'Usable',
        url: 'https://github.com/libp2p/js-libp2p-half-closed-connection-upgrade'
      }
    }
  },
  'peer-routing': {
    'libp2p-kad-dht': {
      'Browser JS': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/js-libp2p-dht'
      },
      'Node.js': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/js-libp2p-dht'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-kad-dht'
      }
    }
  },
  'record-stores': {
    'record': {
      'Browser JS': {
        status: 'Usable',
        url: 'https://github.com/libp2p/js-libp2p-record'
      },
      'Node.js': {
        status: 'Usable',
        url: 'https://github.com/libp2p/js-libp2p-record'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-record'
      },
      'C#': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/go-libp2p-record'
      }
    }
  },
  'nat-traversal': {
    'libp2p-nat': {
      'Go': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/go-libp2p-nat'
      }
    }
  },
  'discovery': {
    'bootstrap': {
      'Browser JS': {
        status: 'Usable',
        url: 'https://github.com/libp2p/js-libp2p-railing'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-railing'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/ipfs/go-ipfs/blob/master/core/bootstrap.go'
      }
    },
    'random-walk': {
      'Browser JS': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/js-libp2p-random-walk'
      },
      'Node.js': {
        status: 'Unstable',
        url: 'https://github.com/libp2p/js-libp2p-random-walk'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-kad-dht'
      }
    },
    'mdns-discovery': {
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-mdns'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p/blob/master/p2p/discovery/mdns.go'
      }
    }
  },
  'utils': {
    'crypto': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-crypto'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-crypto'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-crypto'
      }
    },
    'libp2p-ping': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-ping'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-ping'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p/p2p/protocol/ping'
      }
    },
    'libp2p-peer-id': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-peer-id'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-peer-id'
      }
    },
    'libp2p-peer-info': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-peer-info'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-peer-info'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-peer'
      }
    },
    'libp2p-peer-book': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-peer-book'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-peer-book'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p-peerstore'
      }
    },
    'libp2p-swarm': {
      'Browser JS': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-swarm'
      },
      'Node.js': {
        status: 'Done',
        url: 'https://github.com/libp2p/js-libp2p-swarm'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-libp2p/tree/master/p2p/host/basic'
      }
    }
  },
  'others': {
    'libp2p-floodsub': {
      'Browser JS': {
        status: 'Usable',
        url: 'https://github.com/libp2p/js-libp2p-floodsub'
      },
      'Node.js': {
        status: 'Usable',
        url: 'https://github.com/libp2p/js-libp2p-floodsub'
      },
      'Go': {
        status: 'Done',
        url: 'https://github.com/libp2p/go-floodsub'
      }
    }
  }
}

},{}]},{},[5]);
