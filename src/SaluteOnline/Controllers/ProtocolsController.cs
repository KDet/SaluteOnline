﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SaluteOnline.DAL;
using SaluteOnline.Domain.Enums;
using SaluteOnline.Domain.MongoModels;

namespace SaluteOnline.Controllers
{
    [Route("api/[controller]")]
    public class ProtocolsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private ILogger<ProtocolsController> _logger;

        public ProtocolsController(IUnitOfWork unitOfWork, ILogger<ProtocolsController> logger)
        {
            if (unitOfWork == null)
                throw new ArgumentException(nameof(unitOfWork));
            if (logger == null)
                throw new ArgumentNullException(nameof(logger));
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(nameof(Role.User))]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _unitOfWork.Protocols.GetAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpGet("{guid}")]
        public async Task<IActionResult> Get(Guid guid)
        {
            try
            {
                return Ok(await _unitOfWork.Protocols.GetByIdAsync(guid));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpGet("GetPage")]
        public async Task<IActionResult> GetPage([FromQuery] int page, int items)
        {
            try
            {
                return Ok(await _unitOfWork.Protocols.GetPageAsync(page, items));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(MongoProtocol protocol)
        {
            try
            {
                await Task.Factory.StartNew(() => _unitOfWork.Protocols.InsertAsync(protocol))
                    .ContinueWith(prevTask => _unitOfWork.SaveAsync());
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(MongoProtocol protocol)
        {
            try
            {
                if (protocol == null)
                {
                    return BadRequest("Protocol is empty");
                }
                var result = await _unitOfWork.Protocols.UpdateAsync(protocol);
                if (result == null)
                {
                    return NotFound("Error while updating protocol");
                }
                await Task.Run(() => _unitOfWork.SaveAsync());
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpDelete("{guid}")]
        public async Task<IActionResult> Delete(Guid guid)
        {
            try
            {
                await Task.Factory.StartNew(() => _unitOfWork.Protocols.DeleteAsync(guid))
                    .ContinueWith(prevTask => _unitOfWork.SaveAsync());
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpPost("DeleteProtocol")]
        public async Task<IActionResult> Delete(MongoProtocol protocol)
        {
            try
            {
                await Task.Factory.StartNew(() => _unitOfWork.Protocols.DeleteAsync(protocol))
                    .ContinueWith(prevTask => _unitOfWork.SaveAsync());
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }
    }
}
