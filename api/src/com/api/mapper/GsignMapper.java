package com.api.mapper;

import com.api.pojo.Gsign;
import com.api.pojo.GsignExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface GsignMapper {
    long countByExample(GsignExample example);

    int deleteByExample(GsignExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Gsign record);

    int insertSelective(Gsign record);

    List<Gsign> selectByExample(GsignExample example);

    Gsign selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Gsign record, @Param("example") GsignExample example);

    int updateByExample(@Param("record") Gsign record, @Param("example") GsignExample example);

    int updateByPrimaryKeySelective(Gsign record);

    int updateByPrimaryKey(Gsign record);
}